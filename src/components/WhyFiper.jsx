import { motion } from "framer-motion";
import {
  Zap,
  Globe,
  Landmark,
  Smartphone,
  Receipt,
  ShieldOff,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Activation",
    desc: "Virtual card ready in 5 minutes. Physical card active within 5–10 minutes of ordering.",
  },
  {
    icon: Globe,
    title: "Global Payments",
    desc: "Use your card for purchases anywhere in the world, in any currency.",
  },
  {
    icon: Landmark,
    title: "Worldwide ATM Access",
    desc: "Withdraw cash from ATMs globally with the Physical Card, up to $2,000/week.",
  },
  {
    icon: Smartphone,
    title: "Apple & Google Pay",
    desc: "Add your Virtual Card to your phone wallet and pay instantly with a tap.",
  },
  {
    icon: Receipt,
    title: "Transparent Fees",
    desc: "1.7% top-up fee, $0.40 per transaction. No surprises ever.",
  },
  {
    icon: ShieldOff,
    title: "Freeze Anytime",
    desc: "Instantly lock and unlock your card from your dashboard with a single click.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function WhyFiper() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">
            Why Fiper Card
          </p>
          <h2
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Everything you need.
            <span className="text-zinc-500"> Nothing you don&apos;t.</span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass card-shine rounded-3xl p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 cursor-default"
            >
              <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-fiper/10 p-3">
                <f.icon size={22} className="text-fiper" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {f.title}
              </h3>
              <p className="text-base leading-relaxed text-zinc-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
