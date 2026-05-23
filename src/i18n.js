import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";

/* English is bundled. Every other locale is code-split and loaded on demand. */
const loaders = {
  ar: () => import("./locales/ar.json"),
  nl: () => import("./locales/nl.json"),
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
    supportedLngs: ["en", "ar", "nl", "tr", "fr", "es", "pt"],
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

const loaded = new Set(["en"]);

async function ensureLoaded(lng) {
  if (loaded.has(lng) || !loaders[lng]) return;
  const mod = await loaders[lng]();
  i18n.addResourceBundle(lng, "translation", mod.default, true, true);
  loaded.add(lng);
}

/* Public API: load the bundle FIRST, then switch the language.
   This guarantees React re-renders with translated strings, not stale ones. */
export async function changeLanguageSafely(lng) {
  if (lng === i18n.language) return;
  await ensureLoaded(lng);
  await i18n.changeLanguage(lng);
}

/* Load the detected language at startup if it's not English.
   We don't await here because startup shouldn't block — fallback to English. */
if (i18n.language && i18n.language !== "en") {
  ensureLoaded(i18n.language).then(() => {
    i18n.emit("languageChanged", i18n.language);
  });
}

export default i18n;

export const LANGUAGES = [
  { code: "nl", label: "Nederlands", native: "NL", flag: "🇳🇱" },
  { code: "en", label: "English", native: "EN", flag: "🇬🇧" },
  { code: "ar", label: "العربية", native: "AR", flag: "🇸🇦" },
  { code: "tr", label: "Türkçe", native: "TR", flag: "🇹🇷" },
  { code: "fr", label: "Français", native: "FR", flag: "🇫🇷" },
  { code: "es", label: "Español", native: "ES", flag: "🇪🇸" },
  { code: "pt", label: "Português", native: "PT", flag: "🇧🇷" },
];
