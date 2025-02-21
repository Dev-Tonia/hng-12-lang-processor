import { Bounce, toast } from "react-toastify";
import CustomNotification from "../components/CustomNotification";

interface ProgressEvent {
  loaded: number;
  total: number;
}

interface ProgressMonitor {
  addEventListener: (
    event: string,
    callback: (e: ProgressEvent) => void
  ) => void;
}

interface SummarizerOptions {
  sharedContext: string;
  type: string;
  format: string;
  length: string;
}

interface SummarizerInstance {
  ready: Promise<void>;
  summarize: (text: string) => Promise<string>;
  addEventListener: (
    event: string,
    callback: (e: ProgressEvent) => void
  ) => void;
}

interface DetectorResult {
  detectedLanguage: string;
  confidence: number;
}

interface DetectorInstance {
  ready: Promise<void>;
  detect: (text: string) => Promise<DetectorResult[]>;
}

interface TranslatorInstance {
  translate: (text: string) => Promise<string>;
}

interface AICapabilities {
  available: "no" | "readily" | "after-download";
  languagePairAvailable?: (
    source: string,
    target: string
  ) => "no" | "readily" | "after-download";
}

declare global {
  interface Window {
    ai: {
      languageDetector: {
        capabilities: () => Promise<{
          capabilities: AICapabilities["available"];
        }>;
        create: (options?: {
          monitor?: (m: ProgressMonitor) => void;
        }) => Promise<DetectorInstance>;
      };
      translator: {
        capabilities: () => Promise<{
          languagePairAvailable: (
            source: string,
            target: string
          ) => AICapabilities["available"];
        }>;
        create: (config: {
          sourceLanguage: string;
          targetLanguage: string;
          monitor?: (m: ProgressMonitor) => void;
        }) => Promise<TranslatorInstance>;
      };
      summarizer: {
        capabilities: () => Promise<{ available: AICapabilities["available"] }>;
        create: (options: SummarizerOptions) => Promise<SummarizerInstance>;
      };
    };
  }
}

export async function createSummarizer(options: SummarizerOptions) {
  const summarizerCapabilities = await window.ai.summarizer.capabilities();

  if (summarizerCapabilities.available === "no") {
    toast.error(CustomNotification, {
      data: {
        title: "Oh Snap!",
        content: "Summarizer API is not available",
      },
      theme: "colored",
      transition: Bounce,
      autoClose: 5000,
    });
    return null;
  }

  try {
    const summarizer = await window.ai.summarizer.create(options);

    if (summarizerCapabilities.available === "after-download") {
      summarizer.addEventListener("downloadprogress", (e: ProgressEvent) => {
        const progress = ((e.loaded / e.total) * 100).toFixed(2);
        toast.info(`Downloading summarizer model: ${progress}%`, {
          theme: "colored",
          transition: Bounce,
        });
      });
      await summarizer.ready;
    }

    return await summarizer.summarize(options.sharedContext);
  } catch (error) {
    toast.error(`Summarizer error: ${error}`, {
      theme: "colored",
      transition: Bounce,
    });
    return null;
  }
}

export async function detectLanguage(
  messageData: string,
  setDetectedLanguage?: (lang: string) => void
) {
  const { capabilities: canDetect } =
    await window.ai.languageDetector.capabilities();

  if (canDetect === "no") {
    toast.error(CustomNotification, {
      data: {
        title: "Oh Snap!",
        content: "Language detection not available",
      },
      theme: "colored",
      transition: Bounce,
      autoClose: 5000,
    });
    return null;
  }

  try {
    const detector = await window.ai.languageDetector.create(
      canDetect === "after-download"
        ? {
            monitor: (m: ProgressMonitor) => {
              m.addEventListener("downloadprogress", (e: ProgressEvent) => {
                const progress = ((e.loaded / e.total) * 100).toFixed(2);
                toast.info(`Downloading language model: ${progress}%`);
              });
            },
          }
        : undefined
    );

    if (canDetect === "after-download") {
      await detector.ready;
    }

    const results = await detector.detect(messageData);
    const highestConfidence = results.reduce((max, current) =>
      current.confidence > max.confidence ? current : max
    );

    setDetectedLanguage?.(highestConfidence.detectedLanguage);
    return highestConfidence;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Language detection failed", {
      theme: "colored",
      transition: Bounce,
    });
    return null;
  }
}

export async function createTranslator(
  sourceLanguage: string,
  targetLanguage: string,
  text: string
): Promise<string | null> {
  try {
    const translatorCapabilities = await window.ai.translator.capabilities();
    const canTranslate = translatorCapabilities.languagePairAvailable(
      sourceLanguage,
      targetLanguage
    );

    if (canTranslate === "no") {
      toast.error(CustomNotification, {
        data: {
          title: "Translation Unavailable",
          content: "This language pair is not supported.",
        },
        theme: "colored",
        transition: Bounce,
        autoClose: 5000,
      });
      return null;
    }

    const translator = await window.ai.translator.create({
      sourceLanguage,
      targetLanguage,
      monitor:
        canTranslate === "after-download"
          ? (m: ProgressMonitor) => {
              m.addEventListener("downloadprogress", (e: ProgressEvent) => {
                const progress = ((e.loaded / e.total) * 100).toFixed(2);
                toast.info(`Downloading translation model: ${progress}%`);
              });
            }
          : undefined,
    });

    const translatedText = await translator.translate(text);
    return translatedText;
  } catch (error) {
    toast.error(`Translation failed: ${error}`, {
      theme: "colored",
      transition: Bounce,
    });
    return null;
  }
}
