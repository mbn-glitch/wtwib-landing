import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Star } from "lucide-react";
import FiperCard3D from "./FiperCard3D";

export default function ChooseCard() {
  const { t } = useTranslation();

  // PRICING MODEL — confirmed with operations
  // Virtual Card: $50 issuing fee → $30 loaded to card balance → $20 actual cost
  // Physical Card: $100 issuing fee (no balance loaded)
  // These values MUST match helpCenter.vp_a1 in src/locales/*.json.
  const plans = [
    {
      name: t("chooseCard.virtualCard"),
      price: "$50",
      badge: t("chooseCard.virtualBadge"),
      variant: "virtual",
      cta: t("chooseCard.virtualCta"),
      popular: true,
      features: [
        { text: t("chooseCard.vf1"), included: true },
        { text: t("chooseCard.vf2"), included: true },
        { text: t("chooseCard.vf3"), included: true },
        { text: t("chooseCard.vf4"), included: true },
        { text: t("chooseCard.vf5"), included: true },
        { text: t("chooseCard.vf6"), included: false },
      ],
      fees: [
        { label: t("chooseCard.topUp"), value: t("chooseCard.topUpVal") },
        { label: t("chooseCard.transaction"), value: t("chooseCard.transactionVal") },
        { label: t("chooseCard.declined"), value: t("chooseCard.declinedVal") },
        { label: t("chooseCard.reverse"), value: t("chooseCard.reverseVal") },
        { label: t("chooseCard.fxRate"), value: t("chooseCard.fxRateVal") },
      ],
    },
    {
      name: t("chooseCard.physicalCard"),
      price: "$100",
      badge: t("chooseCard.physicalBadge"),
      variant: "physical",
      cta: t("chooseCard.physicalCta"),
      popular: false,
      premium: true,
      features: [
        { text: t("chooseCard.pf1"), included: true },
        { text: t("chooseCard.pf2"), included: true },
        { text: t("chooseCard.pf3"), included: true },
        { text: t("chooseCard.pf4"), included: true },
        { text: t("chooseCard.pf5"), included: false },
        { text: t("chooseCard.pf6"), included: false },
      ],
      fees: [
        { label: t("chooseCard.topUp"), value: t("chooseCard.topUpVal") },
        { label: t("chooseCard.transaction"), value: t("chooseCard.transactionVal") },
        { label: t("chooseCard.declined"), value: t("chooseCard.declinedVal") },
        { label: t("chooseCard.reverse"), value: t("chooseCard.reverseVal") },
        { label: t("chooseCard.delivery"), value: t("chooseCard.deliveryVal") },
      ],
    },
  ];

  return (
    <section id="cards" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-red-500/[0.03] blur-[200px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">{t("chooseCard.label")}</p>
          <h2 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.04em" }}>
            {t("chooseCard.heading1")}
            <span className="text-zinc-400"> {t("chooseCard.heading2")}</span>
          </h2>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          <div className="hidden lg:block absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px">
            <div className="h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {plans.map((plan, idx) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: idx * 0.15 }} whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${plan.premium ? "border-2 border-fiper/50 bg-gradient-to-b from-red-500/[0.08] to-transparent hover:border-fiper hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.4)]" : plan.popular ? "border border-white/[0.08] bg-white/[0.015] hover:border-white/[0.15]" : "border border-white/[0.06] bg-white/[0.02] hover:border-red-500/30"}`}>
              {plan.premium && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fiper to-transparent" />}
              {plan.popular && (
                <div className="absolute top-5 end-5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {t("chooseCard.mostPopular")}
                  </span>
                </div>
              )}
              {plan.premium && (
                <div className="absolute top-5 end-5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/30">
                    <Star size={12} fill="currentColor" />
                    {t("chooseCard.premiumChoice")}
                  </span>
                </div>
              )}
              <div className="p-8 lg:p-10">
                <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-zinc-400 mb-6">{plan.badge}</span>
                <div className="flex justify-center mb-8 scale-[0.75] origin-center sm:scale-[0.85]">
                  <FiperCard3D variant={plan.variant} />
                </div>
                <div className="flex items-baseline justify-between mb-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="text-end">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <p className="text-xs text-zinc-500 mt-1">{t("chooseCard.oneTimeFee")}</p>
                  </div>
                </div>
                {plan.variant === "virtual" && (
                  <div className="rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 p-4 mb-8">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-400">{t("chooseCard.loadedToCard")}</span>
                      <span className="text-emerald-400 font-medium">+ $30</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                      <span className="text-zinc-300 font-medium">{t("chooseCard.actualCost")}</span>
                      <span className="text-white font-semibold">$20</span>
                    </div>
                  </div>
                )}
                {plan.variant === "physical" && (
                  <div className="rounded-xl bg-fiper/[0.04] border border-fiper/20 p-4 mb-8">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-400">{t("chooseCard.atmAccess")}</span>
                      <span className="text-emerald-400 font-medium">$2k / week</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                      <span className="text-zinc-300 font-medium">{t("chooseCard.validity")}</span>
                      <span className="text-white font-semibold">{t("chooseCard.threeYears")}</span>
                    </div>
                  </div>
                )}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3">
                      {f.included ? <Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" /> : <X size={16} className="mt-0.5 flex-shrink-0 text-zinc-600" />}
                      <span className={`text-sm ${f.included ? "text-zinc-300" : "text-zinc-600"}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">{t("chooseCard.feesTitle")}</p>
                  <div className="space-y-2">
                    {plan.fees.map((fee) => (
                      <div key={fee.label} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">{fee.label}</span>
                        <span className="text-zinc-300 font-medium">{fee.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a href="https://crm.fiper.me" target="_blank" rel="noopener noreferrer"
                  className={`group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold transition-all duration-300 ${plan.popular ? "bg-fiper text-white hover:bg-fiper-dark hover:shadow-lg hover:shadow-red-500/25" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}>
                  {plan.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl-flip" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-zinc-600 mt-8">{t("chooseCard.footnote")}</p>
      </div>
    </section>
  );
}
