import { motion } from "framer-motion";
import { UserPlus, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Open your Fiper account",
    desc: "Create your account in minutes and start managing your funds from one unified dashboard.",
  },
  {
    num: "02",
    icon: CreditCard,
    title: "Order your card",
    desc: "Choose between Virtual or Physical, pay the one-time issuing fee, and you're set.",
  },
  {
    num: "03",
    icon: ShoppingBag,
    title: "Start spending immediately",
    desc: "Use your Virtual Card instantly online, or wait for your Physical Card to arrive and withdraw worldwide.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
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
            How It Works
          </p>
          <h2
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Three steps.
            <span className="text-zinc-500"> That&apos;s it.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-8 lg:grid-cols-3">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[16.67%] right-[16.67%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full bg-gradient-to-r from-fiper/50 via-fiper/20 to-fiper/50 origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative text-center"
            >
              {/* Number */}
              <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-fiper/10 border border-fiper/20">
                <span className="text-2xl font-bold text-fiper">
                  {step.num}
                </span>
              </div>

              {/* Icon */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                <step.icon size={20} className="text-zinc-400" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-base leading-relaxed text-zinc-400 max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mid-page CTA — ghost style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#cards"
            className="group inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-500/10 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-500/20 hover:border-red-500"
          >
            Get Started Today
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
