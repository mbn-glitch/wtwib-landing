import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const keys = ["r1", "r2", "r3", "r4"];
const nums = ["01", "02", "03", "04"];

export default function FourReasons() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">{t("fourReasons.label")}</p>
          <h2 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.04em" }}>
            {t("fourReasons.heading1")}
            <span className="text-zinc-500"> {t("fourReasons.heading2")}</span>
          </h2>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 max-w-5xl mx-auto">
          {keys.map((key, i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: i * 0.12 }} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="group relative glass card-shine rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-red-500/30 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.15)]">
              <span className="absolute -top-4 -end-2 text-[8rem] md:text-[10rem] font-black leading-none pointer-events-none select-none" style={{ background: "linear-gradient(180deg, rgba(220,38,38,0.12) 0%, transparent 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{nums[i]}</span>
              <div className="relative z-10">
                <h3 className="mt-4 text-xl font-semibold text-white mb-4">{t(`fourReasons.${key}Title`)}</h3>
                <p className="text-base leading-relaxed text-zinc-400">{t(`fourReasons.${key}Desc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-16 text-center">
          <a href="https://crm.fiper.me" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-500/10 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-500/20 hover:border-red-500">
            {t("fourReasons.cta")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl-flip" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
