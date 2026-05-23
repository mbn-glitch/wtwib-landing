import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

const REGISTRATION_URL = "https://crm.wtradersworld.com/registration-live";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* Single smooth upward path. Decorative — not bound to any data. */
const CURVE_D =
  "M 40 260 C 180 260 220 230 320 210 C 420 190 460 160 540 130 C 620 100 680 70 760 30";

/* Closed path for the area fill under the curve. */
const AREA_D = `${CURVE_D} L 760 300 L 40 300 Z`;

/* Pulsing nodes positioned along the curve. */
const NODES = [
  { cx: 320, cy: 210, r: 4 },
  { cx: 540, cy: 130, r: 4 },
  { cx: 760, cy: 30, r: 5 },
];

function EarningsChart({ reduced }) {
  const drawTransition = reduced
    ? { duration: 0 }
    : { duration: 1.2, ease: "easeOut" };

  return (
    <svg
      viewBox="0 0 800 320"
      className="w-full max-w-[640px] h-auto gpu-layer"
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-line-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0.4" />
          <stop offset="55%" stopColor="#E5D08C" stopOpacity="1" />
          <stop offset="100%" stopColor="#E5D08C" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="hero-area-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </linearGradient>
        <filter id="hero-line-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Area fill — fades in after the line draws */}
      <motion.path
        d={AREA_D}
        fill="url(#hero-area-gradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 1.0, delay: 0.6 }}
      />

      {/* Blurred glow line behind the main stroke */}
      <motion.path
        d={CURVE_D}
        stroke="#C9A961"
        strokeOpacity="0.45"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        filter="url(#hero-line-glow)"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={drawTransition}
      />

      {/* Main gradient stroke */}
      <motion.path
        d={CURVE_D}
        stroke="url(#hero-line-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={drawTransition}
      />

      {/* Pulsing nodes — appear after the line completes */}
      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="#E5D08C"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            reduced
              ? { scale: 1, opacity: 1 }
              : { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.3 + i * 0.3,
                }
          }
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const stats = [
    { value: t("hero.stat1Value"), label: t("hero.stat1Label") },
    { value: t("hero.stat2Value"), label: t("hero.stat2Label") },
    { value: t("hero.stat3Value"), label: t("hero.stat3Label") },
    { value: t("hero.stat4Value"), label: t("hero.stat4Label") },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden overflow-y-visible pt-36 sm:pt-32 md:pt-28 lg:pt-24"
    >
      {/* Ambient gold glows + dot pattern (matches sister-project pattern) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-900/5 blur-[120px]" />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.05,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mt-6 sm:mt-0 mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-zinc-400 text-center max-w-[90vw]">
            <TrendingUp size={12} className="text-fiper shrink-0 sm:size-3.5" />
            <span className="truncate sm:whitespace-normal">{t("hero.badge")}</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance"
          style={{ letterSpacing: "-0.04em" }}
        >
          {t("hero.headline")}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          {t("hero.subheadline")}
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-fiper px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-fiper-dark hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02]"
          >
            {t("hero.cta1")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl-flip" />
          </a>
          <a
            href="#earnings"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:border-white/25"
          >
            <TrendingUp size={16} />
            {t("hero.cta2")}
          </a>
        </motion.div>

        {/* Earnings chart — hidden on small mobile, shown from sm: up. Floating wraps the SVG, not the stats. */}
        <motion.div
          variants={fadeUp}
          className="hidden sm:flex mt-14 lg:mt-16 justify-center"
        >
          <motion.div
            className="relative w-full max-w-[640px]"
            initial={{ y: 0 }}
            whileInView={reduced ? undefined : { y: [-4, 4, -4] }}
            viewport={{ once: true, margin: "-50px" }}
            transition={
              reduced
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }
            }
          >
            <EarningsChart reduced={reduced} />
          </motion.div>
        </motion.div>

        {/* Stat badges row — 2×2 on mobile, 4-up on desktop */}
        <motion.div
          variants={fadeUp}
          className="mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 text-center transition-all duration-300 hover:bg-white/[0.08] hover:border-amber-500/20"
            >
              <p className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
