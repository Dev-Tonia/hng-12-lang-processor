import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Function to set meta tag content dynamically
const setMetaTag = (id: string, content: string) => {
  const metaTag = document.getElementById(id);
  if (metaTag) {
    metaTag.setAttribute("content", content);
  }
};

// Set meta tag content dynamically
setMetaTag(
  "origin-trial-translator",
  import.meta.env.VITE_ORIGIN_TRIAL_TRANSLATOR
);
setMetaTag(
  "origin-trial-summarizer",
  import.meta.env.VITE_ORIGIN_TRIAL_SUMMARIZE
);
setMetaTag("origin-trial-detector", import.meta.env.VITE_ORIGIN_TRIAL_DETECTOR);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
