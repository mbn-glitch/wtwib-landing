import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Image, Link, LayoutDashboard, Code2 } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function MarketingTools() {
  const { t } = useTranslation();

  const tools = [
    { icon: Image, title: t("marketingTools.t1Title"), desc: t("marketingTools.t1Desc") },
    { icon: Link, title: t("marketingTools.t2Title"), desc: t("marketingTools.t2Desc") },
    { icon: LayoutDashboard, title: t("marketingTools.t3Title"), desc: t("marketingTools.t3Desc") },
    { icon: Code2, title: t("marketingTools.t4Title"), desc: t("marketingTools.t4Desc") },
  ];

  return (
    <section
      id="marketing-tools"
      aria-labelledby="marketing-tools-title"
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
            {t("marketingTools.sectionLabel")}
          </p>
          <h2
            id="marketing-tools-title"
            className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("marketingTools.title")}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-400 text-balance">
            {t("marketingTools.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {tools.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group gpu-layer flex items-start gap-4 rounded-2xl bg-white/[0.03] border border-white/10 p-6 lg:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div
                aria-hidden="true"
                className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-fiper transition-colors duration-300 group-hover:bg-amber-500/15"
              >
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
