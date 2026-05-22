import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { UserPlus, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";

const icons = [UserPlus, CreditCard, ShoppingBag];
const stepKeys = ["step1", "step2", "step3"];

function AnimatedConnectingLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="hidden lg:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px]">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs><linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#C9A961" stopOpacity="0.6" /><stop offset="50%" stopColor="#C9A961" stopOpacity="0.2" /><stop offset="100%" stopColor="#C9A961" stopOpacity="0.6" /></linearGradient></defs>
        <motion.line x1="0" y1="1" x2="100%" y2="1" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : {}} transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} />
        <motion.circle r="4" fill="#C9A961" initial={{ cx: "0%", cy: 1, opacity: 0 }} animate={isInView ? { cx: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}} transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }} />
      </svg>
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">{t("howItWorks.label")}</p>
          <h2 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.04em" }}>
            {t("howItWorks.heading1")}
            <span className="text-zinc-400"> {t("howItWorks.heading2")}</span>
          </h2>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-3">
          <AnimatedConnectingLine />
          {stepKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }} whileHover="hover" className="relative text-center group">
                <motion.div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-fiper/15 border border-fiper/40 shadow-lg shadow-amber-500/10" variants={{ hover: { scale: 1.1, transition: { duration: 0.3 } } }}>
                  <span className="text-2xl font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                </motion.div>
                <motion.div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5" variants={{ hover: { y: [-2, 2, -2], transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" } } }}>
                  <Icon size={20} className="text-zinc-400 group-hover:text-fiper transition-colors duration-300" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{t(`howItWorks.${key}Title`)}</h3>
                <p className="text-base leading-relaxed text-zinc-400 max-w-xs mx-auto">{t(`howItWorks.${key}Desc`)}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-16 text-center">
          <a href="https://crm.wtradersworld.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-fiper px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-fiper-dark hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02]">
            {t("howItWorks.cta")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl-flip" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
