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
    <section className="relative py-24 md:py-32">
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
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group glass card-shine rounded-3xl p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20"
            >
              <span className="text-5xl font-bold text-fiper/20 group-hover:text-fiper/30 transition-colors duration-300">
                {r.num}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white mb-4">
                {r.title}
              </h3>
              <p className="text-base leading-relaxed text-zinc-400">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mid-page CTA — ghost style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#cards"
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
