import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ShieldCheck, Bell, LayoutDashboard, Lock } from "lucide-react";

const icons = [ShieldCheck, Bell, LayoutDashboard, Lock];
const keys = ["s1", "s2", "s3", "s4"];

export default function TrustSecurity() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">{t("trustSecurity.label")}</p>
          <h2 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.04em" }}>
            {t("trustSecurity.heading1")} <span className="text-gradient-red">{t("trustSecurity.heading2")}</span>
          </h2>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: i * 0.1 }} whileHover={{ y: -4, transition: { duration: 0.25 } }} className="glass card-shine rounded-3xl p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20">
                <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-fiper/10 p-3"><Icon size={22} className="text-fiper" /></div>
                <h3 className="text-xl font-semibold text-white mb-4">{t(`trustSecurity.${key}Title`)}</h3>
                <p className="text-base leading-relaxed text-zinc-400">{t(`trustSecurity.${key}Desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
