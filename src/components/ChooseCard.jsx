import { motion } from "framer-motion";
import { Check, X, ArrowRight, Star } from "lucide-react";
import FiperCard3D from "./FiperCard3D";

const plans = [
  {
    name: "Virtual Card",
    price: "$30",
    badge: "Best for daily use & Apple Pay",
    variant: "virtual",
    cta: "Activate your card instantly",
    popular: true,
    features: [
      { text: "Activation in 5 minutes", included: true },
      { text: "Apple Pay supported", included: true },
      { text: "Google Pay supported", included: true },
      { text: "Global online payments", included: true },
      { text: "Valid for 3 years", included: true },
      { text: "ATM withdrawals not supported", included: false },
    ],
    fees: [
      { label: "Top up", value: "1.7%" },
      { label: "Transaction", value: "$0.30–$0.40" },
      { label: "Declined", value: "$0.50" },
      { label: "Reverse", value: "Depends on currency" },
      { label: "FX Rate", value: "By card issuer" },
    ],
  },
  {
    name: "Physical Card",
    price: "$50",
    badge: "Best for travel & ATM withdrawals",
    variant: "physical",
    cta: "Get your card for global use",
    popular: false,
    features: [
      { text: "Activation in 5–10 minutes", included: true },
      { text: "Worldwide ATM access ($2k/week)", included: true },
      { text: "Global in-store payments", included: true },
      { text: "Valid for 3 years", included: true },
      { text: "Apple Pay not supported", included: false },
      { text: "Google Pay not supported", included: false },
    ],
    fees: [
      { label: "Top up", value: "1.7%" },
      { label: "Transaction", value: "$0.30–$0.40" },
      { label: "Declined", value: "$0.50" },
      { label: "Reverse", value: "Depends on currency" },
      { label: "Delivery", value: "1–2 weeks" },
    ],
  },
];

export default function ChooseCard() {
  return (
    <section id="cards" className="relative py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-red-500/[0.03] blur-[200px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">
            Choose Your Card
          </p>
          <h2
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Two cards.
            <span className="text-zinc-500"> One ecosystem.</span>
          </h2>
        </motion.div>

        {/* Cards with vertical divider */}
        <div className="relative grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Vertical divider (desktop only) */}
          <div className="hidden lg:block absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px">
            <div className="h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.2)] ${
                plan.popular
                  ? "border border-fiper/30 bg-gradient-to-b from-red-500/5 to-transparent hover:border-fiper/50"
                  : "border border-white/[0.06] bg-white/[0.02] hover:border-red-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fiper to-transparent" />
              )}

              {/* MOST POPULAR badge */}
              {plan.popular && (
                <div className="absolute top-5 right-5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/25">
                    <Star size={12} fill="currentColor" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 lg:p-10">
                {/* Badge */}
                <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-zinc-400 mb-6">
                  {plan.badge}
                </span>

                {/* Card visual */}
                <div className="flex justify-center mb-8 scale-[0.75] origin-center sm:scale-[0.85]">
                  <FiperCard3D variant={plan.variant} />
                </div>

                {/* Name + Price */}
                <div className="flex items-baseline justify-between mb-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="text-right">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <p className="text-xs text-zinc-500 mt-1">
                      One-time issuing fee
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3">
                      {f.included ? (
                        <Check
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-emerald-500"
                        />
                      ) : (
                        <X
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-zinc-600"
                        />
                      )}
                      <span
                        className={`text-sm ${
                          f.included ? "text-zinc-300" : "text-zinc-600"
                        }`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Fees table */}
                <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                    Fees
                  </p>
                  <div className="space-y-2">
                    {plan.fees.map((fee) => (
                      <div
                        key={fee.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-zinc-500">{fee.label}</span>
                        <span className="text-zinc-300 font-medium">
                          {fee.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://crm.fiper.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-fiper text-white hover:bg-fiper-dark hover:shadow-lg hover:shadow-red-500/25"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-8">
          All issuing fees are one-time and non-refundable.
        </p>
      </div>
    </section>
  );
}
