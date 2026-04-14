import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";

/* Only English is bundled upfront. Other locales are code-split and
   loaded on demand when the user switches language. */
const loaders = {
  ar: () => import("./locales/ar.json"),
  tr: () => import("./locales/tr.json"),
  fr: () => import("./locales/fr.json"),
  es: () => import("./locales/es.json"),
  pt: () => import("./locales/pt.json"),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "tr", "fr", "es", "pt"],
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

/* Lazy-load a locale on first request, then never reload it. */
const loaded = new Set(["en"]);

async function ensureLoaded(lng) {
  if (loaded.has(lng) || !loaders[lng]) return;
  const mod = await loaders[lng]();
  i18n.addResourceBundle(lng, "translation", mod.default, true, true);
  loaded.add(lng);
}

/* Load the detected language if it's not English. */
if (i18n.language && i18n.language !== "en") {
  ensureLoaded(i18n.language);
}

/* Hook language-change events to fetch the bundle just in time. */
i18n.on("languageChanged", (lng) => {
  ensureLoaded(lng);
});

export default i18n;

export const LANGUAGES = [
  { code: "en", label: "English", native: "EN", flag: "🇬🇧" },
  { code: "ar", label: "العربية", native: "عربي", flag: "🇸🇦" },
  { code: "tr", label: "Türkçe", native: "TR", flag: "🇹🇷" },
  { code: "fr", label: "Français", native: "FR", flag: "🇫🇷" },
  { code: "es", label: "Español", native: "ES", flag: "🇪🇸" },
  { code: "pt", label: "Português", native: "PT", flag: "🇧🇷" },
];
