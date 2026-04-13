import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/[0.06] blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fiper/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Trade. Withdraw.{" "}
            <span className="text-gradient-red">Enjoy.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            Your profits are no longer just numbers on a screen. With the Fiper
            Card, they become real purchasing power — in just minutes.
          </p>

          {/* Massive final CTA with pulsing glow */}
          <div className="mt-12 relative inline-block">
            {/* Pulsing glow ring */}
            <div className="absolute inset-0 scale-110 rounded-full bg-red-500/30 blur-2xl animate-pulse pointer-events-none" />
            <a
              href="#cards"
              className="relative group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-12 py-5 text-lg font-semibold text-white shadow-[0_20px_50px_-10px_rgba(220,38,38,0.5)] transition-all duration-300 hover:shadow-[0_25px_60px_-10px_rgba(220,38,38,0.7)] hover:scale-105"
            >
              Get your Fiper Card now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
