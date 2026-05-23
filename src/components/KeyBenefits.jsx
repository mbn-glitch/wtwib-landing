import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Percent, Calendar, Infinity, Layers } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function KeyBenefits() {
  const { t } = useTranslation();

  const benefits = [
    { icon: Percent, title: t("keyBenefits.b1Title"), desc: t("keyBenefits.b1Desc") },
    { icon: Calendar, title: t("keyBenefits.b2Title"), desc: t("keyBenefits.b2Desc") },
    { icon: Infinity, title: t("keyBenefits.b3Title"), desc: t("keyBenefits.b3Desc") },
    { icon: Layers, title: t("keyBenefits.b4Title"), desc: t("keyBenefits.b4Desc") },
  ];

  return (
    <section
      id="why"
      aria-labelledby="key-benefits-title"
      className="relative py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-fiper">
            {t("keyBenefits.sectionLabel")}
          </p>
          <h2
            id="key-benefits-title"
            className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("keyBenefits.title")}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-400 text-balance">
            {t("keyBenefits.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {benefits.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group gpu-layer rounded-2xl bg-white/[0.03] border border-white/10 p-6 lg:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-fiper transition-colors duration-300 group-hover:bg-amber-500/15"
              >
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
