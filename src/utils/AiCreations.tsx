import { Bounce, toast } from "react-toastify";
import CustomNotification from "../components/CustomNotification";

// summarizer option
interface SummarizerOptions {
  sharedContext: string;
  type: "key-points";
  format: "markdown";
  length: "medium";
}

interface Summarizer {
  capabilities: () => Promise<{
    available: "no" | "readily" | "after-download";
  }>;
  create: (options: SummarizerOptions) => Promise<{
    ready: Promise<void>;
    addEventListener: (
      event: string,
      callback: (e: { loaded: number; total: number }) => void
    ) => void;
  }>;
}
interface LanguageDetector {
  capabilities: () => Promise<{
    capabilities: "no" | "readily" | "after-download";
  }>;
  create: (options?: {
    monitor?: (m: {
      addEventListener: (
        event: string,
        callback: (e: { loaded: number; total: number }) => void
      ) => void;
    }) => void;
  }) => Promise<{
    ready: Promise<void>;
  }>;
}

interface Translator {
  create: (config: {
    sourceLanguage: string;
    targetLanguage: string;
  }) => Promise<{
    translate: (text: string) => Promise<string>;
  }>;
}

declare global {
  interface Window {
    ai: {
      languageDetector: LanguageDetector;
      translator: Translator;
      summarizer: Summarizer;
    };
  }
}

export async function createSummarizer(options: SummarizerOptions) {
  const summarizerCapabilities = await window.ai.summarizer.capabilities();
  const available = summarizerCapabilities.available;
  let summarizer;

  if (available === "no") {
    toast.error(CustomNotification, {
      data: {
        title: "Oh Snap!",
        content: "Summarizer API is not available",
      },
      ariaLabel: "Summarizer API is not available",
      progress: undefined,
      icon: false,
      theme: "colored",
      transition: Bounce,
      hideProgressBar: false,
      autoClose: 5000,
    });

    return null;
  }

  try {
    if (available !== "readily") {
      summarizer = await window.ai.summarizer.create(options);
      summarizer.addEventListener("downloadprogress", (e) => {
        const progress = ((e.loaded / e.total) * 100).toFixed(2);
        toast.error("Error initializing summarizer" + progress, {
          theme: "colored",
          transition: Bounce,
        });
        console.log(`Download progress: ${progress}%`);
      });
      await summarizer.ready;
    } else {
      summarizer = await window.ai.summarizer.create(options);
    }

    const summary = await summarizer.summarize(options.sharedContext);
    return summary;
  } catch (error) {
    toast.error("Error initializing summarizer" + error, {
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
  const languageDetectorCapabilities =
    await window.ai.languageDetector.capabilities();
  const canDetect = languageDetectorCapabilities.capabilities;
  let detector;

  //   checking if a device can use the language detector
  if (canDetect === "no") {
    toast.error(CustomNotification, {
      data: {
        title: "Oh Snap!",
        content: "The language detector isn't usable.",
      },
      ariaLabel: "The language detector isn't usable.",
      progress: undefined,
      icon: false,
      theme: "colored",
      transition: Bounce,
      hideProgressBar: false,
      autoClose: 5000,
    });
    return;
  }

  try {
    if (canDetect !== "readily") {
      detector = await window.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector.ready;
    } else {
      detector = await window.ai.languageDetector.create();
    }

    const results = await detector.detect(messageData);
    const highestConfidence = results.reduce((max, current) =>
      current.confidence > max.confidence ? current : max
    );

    toast.info(
      `Detected Language: ${highestConfidence.detectedLanguage} (${(
        highestConfidence.confidence * 100
      ).toFixed(2)}% confidence)`,
      {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      }
    );

    if (setDetectedLanguage) {
      setDetectedLanguage(highestConfidence.detectedLanguage);
    }

    return highestConfidence;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Error detecting language", {
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
) {
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
          content: "This language pair is not supported for translation.",
        },
        theme: "colored",
        transition: Bounce,
        autoClose: 5000,
      });
      return null;
    }

    if (canTranslate !== "readily") {
      const translator = await window.ai.translator.create({
        sourceLanguage,
        targetLanguage,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            const progress = ((e.loaded / e.total) * 100).toFixed(2);
            toast.info(`Downloading translation model: ${progress}%`, {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
              transition: Bounce,
            });
          });
        },
      });
      const translatedText = await translator.translate(text);
      return translatedText;
    }

    const translator = await window.ai.translator.create({
      sourceLanguage,
      targetLanguage,
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
