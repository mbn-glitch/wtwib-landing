import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"];

function FAQItem({ q, a, index, isOpen, onToggle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.05 }} className="relative">
      <div className={`relative rounded-2xl transition-all duration-500 ${isOpen ? "bg-gradient-to-r from-red-500/20 via-red-600/10 to-red-500/20 p-px shadow-[0_0_30px_-5px_rgba(220,38,38,0.15)]" : "bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] p-px"}`}>
        <div className={`rounded-2xl transition-all duration-500 ${isOpen ? "bg-gradient-to-b from-red-500/[0.05] to-black/95" : "bg-black/90 hover:bg-white/[0.02]"}`}>
          <button onClick={onToggle} className="flex w-full items-center justify-between px-7 py-6 text-left group" aria-expanded={isOpen}>
            <span className={`text-base font-medium pe-8 transition-colors duration-300 sm:text-lg ${isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>{q}</span>
            <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${isOpen ? "bg-fiper/20 border border-fiper/30 text-fiper" : "bg-white/5 border border-white/10 text-zinc-500 group-hover:border-white/20 group-hover:text-white"}`}>
              <motion.span animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="block text-sm font-light leading-none">+</motion.span>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3, delay: 0.1 } }} className="overflow-hidden">
                <div className="px-7 pb-7 pt-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-5" />
                  <p className="text-base leading-relaxed text-zinc-400 max-w-2xl">{a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 pb-16 md:pb-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">{t("faq.label")}</p>
          <h2 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.04em" }}>
            {t("faq.heading1")}
            <span className="text-zinc-400"> {t("faq.heading2")}</span>
          </h2>
          <p className="mt-4 text-base text-zinc-500">{t("faq.subtext")}</p>
        </motion.div>

        <div className="space-y-3">
          {faqKeys.map((key, i) => (
            <FAQItem key={key} q={t(`faq.${key}`)} a={t(`faq.a${i + 1}`)} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-12 text-center">
          <Link to="/help-center" className="group inline-flex items-center gap-2 text-sm font-medium text-fiper hover:text-red-400 transition-colors duration-300">
            {t("faq.viewAll")}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 rtl-flip" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
