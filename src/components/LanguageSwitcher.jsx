import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { LANGUAGES } from "../i18n";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const select = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:text-white"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe size={14} />
        <span>{current.native}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sm:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
              onClick={() => setOpen(false)}
            />

            {/* Desktop dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:block absolute end-0 mt-2 w-56 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl shadow-black/50 p-1.5 z-[90]"
            >
              {LANGUAGES.map((lang) => {
                const isActive = lang.code === i18n.language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => select(lang.code)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-200 ${
                      isActive ? "bg-fiper/10 text-fiper" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </span>
                    {isActive && <Check size={14} />}
                  </button>
                );
              })}
            </motion.div>

            {/* Mobile bottom-sheet modal */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden fixed bottom-0 left-0 right-0 z-[90] rounded-t-3xl border-t border-white/10 bg-black/95 backdrop-blur-2xl p-4 pb-8 shadow-2xl"
            >
              <div className="mx-auto w-12 h-1 rounded-full bg-white/20 mb-4" />
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-3 px-2">
                Select language
              </p>
              <div className="space-y-1">
                {LANGUAGES.map((lang) => {
                  const isActive = lang.code === i18n.language;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => select(lang.code)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-base transition-colors duration-200 ${
                        isActive ? "bg-fiper/10 text-fiper" : "text-zinc-300 active:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                      </span>
                      {isActive && <Check size={16} />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
