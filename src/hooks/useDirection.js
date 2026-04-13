import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useDirection() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [i18n.language, isRTL]);

  return { isRTL, language: i18n.language };
}
