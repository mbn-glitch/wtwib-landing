import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const reasons = [
  {
    num: "01",
    title: "Direct Link to Your Trading Account",
    desc: "Your Fiper card connects directly to your trading account — move profits to purchasing power in minutes, with no intermediaries and no extra steps.",
  },
  {
    num: "02",
    title: "Instant Activation — Live in 5 Minutes",
    desc: "Virtual card activated in 5 minutes. Physical card ready in 5–10 minutes. Start spending the same day you sign up — no delays, no bureaucracy.",
  },
  {
    num: "03",
    title: "Apple Pay & Google Pay Ready",
    desc: "Add your Virtual Card to your phone wallet instantly. Pay with a tap anywhere in the world — your profits, now literally in your pocket.",
  },
  {
    num: "04",
    title: "No Monthly Fees — Ever",
    desc: "Pay once to issue your card. No monthly charges, no hidden fees, no subscriptions. Just 1.7% top-up and $0.40 per transaction — fully transparent.",
  },
];

export default function FourReasons() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">
            Why Us
          </p>
          <h2
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Four reasons.
            <span className="text-zinc-500"> One conclusion.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group relative glass card-shine rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-red-500/30 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.15)]"
            >
              {/* Giant watermark number */}
              <span
                className="absolute -top-4 -right-2 text-[8rem] md:text-[10rem] font-black leading-none pointer-events-none select-none"
                style={{
                  background: "linear-gradient(180deg, rgba(220,38,38,0.12) 0%, transparent 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {r.num}
              </span>

              <div className="relative z-10">
                <h3 className="mt-4 text-xl font-semibold text-white mb-4">
                  {r.title}
                </h3>
                <p className="text-base leading-relaxed text-zinc-400">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://crm.fiper.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-500/10 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-500/20 hover:border-red-500"
          >
            Get Your Fiper Card Now
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
