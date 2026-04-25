import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Zap, Globe, Landmark, Smartphone, Receipt, ShieldOff } from "lucide-react";

const icons = [Zap, Globe, Landmark, Smartphone, Receipt, ShieldOff];
const keys = ["f1", "f2", "f3", "f4", "f5", "f6"];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function WhyFiper() {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">{t("whyFiper.label")}</p>
          <h2 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.04em" }}>
            {t("whyFiper.heading1")}
            <span className="text-zinc-400"> {t("whyFiper.heading2")}</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={key} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} whileHover={{ y: -6, transition: { duration: 0.25 } }} className="glass card-shine rounded-3xl p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 cursor-default">
                <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-fiper/10 p-3">
                  <Icon size={22} className="text-fiper" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{t(`whyFiper.${key}Title`)}</h3>
                <p className="text-base leading-relaxed text-zinc-400">{t(`whyFiper.${key}Desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
