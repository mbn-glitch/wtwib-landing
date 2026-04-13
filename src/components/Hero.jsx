import { motion } from "framer-motion";
import { ArrowRight, Layers, Globe } from "lucide-react";
import FiperCard3D from "./FiperCard3D";

const stats = [
  { value: "5 min", label: "Virtual activation", pos: "top-left" },
  { value: "Instant", label: "FREEZE", pos: "top-right" },
  { value: "$0", label: "Hidden fees", pos: "bottom-left" },
  { value: "Global", label: "ATM access", pos: "bottom-right" },
];

const badgePositions = {
  "top-left": "-top-6 -left-12 lg:-top-8 lg:-left-24",
  "top-right": "-top-6 -right-12 lg:-top-8 lg:-right-24",
  "bottom-left": "-bottom-6 -left-12 lg:-bottom-8 lg:-left-24",
  "bottom-right": "-bottom-6 -right-12 lg:-bottom-8 lg:-right-24",
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-red-900/5 blur-[120px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center"
      >
        {/* Badge — FIX 6: Globe icon */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium text-zinc-400">
            <Globe size={14} className="text-fiper animate-pulse" />
            Now available for traders worldwide
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mx-auto max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          Turn your trading profits
          <br />
          into <span className="text-gradient-red">real power</span> in
          Minutes
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          Most traders can&apos;t easily use their profits. We fixed that.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#cards"
            className="group inline-flex items-center gap-2 rounded-full bg-fiper px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-fiper-dark hover:shadow-xl hover:shadow-red-500/25 hover:scale-[1.02]"
          >
            Get your card in 5 minutes
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#cards"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:border-white/25"
          >
            <Layers size={16} />
            Compare cards
          </a>
        </motion.div>

        {/* FIX 3: Floating Card with surrounding stat badges */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex justify-center lg:mt-14"
        >
          <div className="relative">
            {/* Red radial glow behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full bg-red-600/20 blur-[100px] pointer-events-none" />

            <FiperCard3D />

            {/* Desktop: floating stat badges around the card */}
            <div className="hidden lg:block">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={`absolute ${badgePositions[stat.pos]} z-20`}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                >
                  <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 text-center transition-all duration-300 hover:bg-white/[0.08] hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/10">
                    <p className="text-lg font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-zinc-500">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile: stat cards in grid below */}
        <motion.div
          variants={fadeUp}
          className="mt-10 grid grid-cols-2 gap-3 lg:hidden"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center"
            >
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
