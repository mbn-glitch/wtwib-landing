import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { UserPlus, Link2, Megaphone, DollarSign } from "lucide-react";

const STEP_KEYS = ["s1", "s2", "s3", "s4"];
const STEP_ICONS = [UserPlus, Link2, Megaphone, DollarSign];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function ConnectingLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden lg:block absolute top-[34px] left-[12.5%] right-[12.5%] h-[2px] pointer-events-none"
    >
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="howItWorksLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#C9A961" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="url(#howItWorksLineGrad)"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
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
            {t("howItWorks.sectionLabel")}
          </p>
          <h2
            id="how-it-works-title"
            className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("howItWorks.title")}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-400 text-balance">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          <ConnectingLine />
          {STEP_KEYS.map((key, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="relative text-center group"
              >
                {/* Step number badge */}
                <div className="relative mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full bg-black border-2 border-fiper/40 group-hover:border-fiper/70 transition-colors duration-300 shadow-lg shadow-amber-500/10">
                  <span
                    className="text-2xl font-bold text-fiper tabular-nums"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {i + 1}
                  </span>
                </div>
                {/* Secondary icon */}
                <div
                  aria-hidden="true"
                  className="mx-auto mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20"
                >
                  <Icon size={18} className="text-fiper" />
                </div>
                <h3 className="mt-5 text-lg sm:text-xl font-semibold text-white">
                  {t(`howItWorks.${key}Title`)}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  {t(`howItWorks.${key}Desc`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
