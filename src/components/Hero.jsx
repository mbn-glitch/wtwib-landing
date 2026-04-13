import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Layers, Globe } from "lucide-react";
import FiperCard3D from "./FiperCard3D";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function AnimatedCounter({ value, prefix = "", suffix = "", isText = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(isText ? value : 0);

  useEffect(() => {
    if (!isInView || isText) return;
    const target = typeof value === "number" ? value : parseInt(value, 10);
    if (isNaN(target)) return;
    const duration = 1200;
    const startTime = performance.now();
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, value, isText]);

  return <span ref={ref}>{isText ? value : `${prefix}${display}${suffix}`}</span>;
}

export default function Hero() {
  const { t } = useTranslation();

  const stats = [
    { value: t("hero.stat1Value"), label: t("hero.stat1Label"), pos: "top-left", isText: true },
    { value: t("hero.stat2Value"), label: t("hero.stat2Label"), pos: "top-right", isText: true },
    { value: t("hero.stat3Value"), label: t("hero.stat3Label"), pos: "bottom-left", isText: true },
    { value: t("hero.stat4Value"), label: t("hero.stat4Label"), pos: "bottom-right", isText: true },
  ];

  const badgePositions = {
    "top-left": "-top-6 -start-12 lg:-top-8 lg:-start-24",
    "top-right": "-top-6 -end-12 lg:-top-8 lg:-end-24",
    "bottom-left": "-bottom-6 -start-12 lg:-bottom-8 lg:-start-24",
    "bottom-right": "-bottom-6 -end-12 lg:-bottom-8 lg:-end-24",
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden overflow-y-visible pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-red-900/5 blur-[120px]" />
        <div className="absolute inset-0" style={{ opacity: 0.05, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium text-zinc-400">
            <Globe size={14} className="text-fiper animate-pulse" />
            {t("hero.badge")}
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="mx-auto max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.04em" }}>
          {t("hero.headline1")}
          <br />
          {t("hero.headlineInto")} <span className="text-gradient-red">{t("hero.headline2")}</span>
          <br />
          {t("hero.headline3")}
        </motion.h1>

        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          {t("hero.subtext")}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="https://crm.fiper.me" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-fiper px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-fiper-dark hover:shadow-xl hover:shadow-red-500/25 hover:scale-[1.02]">
            {t("hero.cta1")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl-flip" />
          </a>
          <a href="#cards" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:border-white/25">
            <Layers size={16} />
            {t("hero.cta2")}
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex justify-center lg:mt-14">
          <div className="relative">
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(220,38,38,0.25) 0%, rgba(220,38,38,0.08) 40%, transparent 70%)" }} animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[80%] h-[60px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(220,38,38,0.4) 0%, transparent 70%)", filter: "blur(24px)" }} />
            <FiperCard3D />
            <div className="hidden lg:block">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} className={`absolute ${badgePositions[stat.pos]} z-20`} animate={{ y: [-5, 5, -5] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 text-center transition-all duration-300 hover:bg-white/[0.08] hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/10">
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] text-zinc-500">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
