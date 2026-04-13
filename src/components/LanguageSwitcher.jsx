import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const toggle = () => {
    i18n.changeLanguage(isAr ? "en" : "ar");
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:text-white ${className}`}
      aria-label="Switch language"
    >
      <Globe size={14} />
      {isAr ? "EN" : "عربي"}
    </button>
  );
}
