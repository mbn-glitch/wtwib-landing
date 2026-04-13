import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import tr from "./locales/tr.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      tr: { translation: tr },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "tr", "fr", "es", "pt"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
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
