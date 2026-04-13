import { motion } from "framer-motion";
import { ShieldCheck, Bell, LayoutDashboard, Lock } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Secure Infrastructure (2FA)",
    desc: "Multi-layer protection including 2FA and advanced security systems.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    desc: "Get notified of every transaction the moment it happens.",
  },
  {
    icon: LayoutDashboard,
    title: "Full Control Dashboard",
    desc: "Funds are maintained within a structured and stable financial framework.",
  },
  {
    icon: Lock,
    title: "Freeze Anytime",
    desc: "Instantly lock and unlock your card from your dashboard with a single click.",
  },
];

export default function TrustSecurity() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fiper mb-4">
            Trust & Security
          </p>
          <h2
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Your money.{" "}
            <span className="text-gradient-red">Protected.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass card-shine rounded-3xl p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20"
            >
              <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-fiper/10 p-3">
                <item.icon size={22} className="text-fiper" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-zinc-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
