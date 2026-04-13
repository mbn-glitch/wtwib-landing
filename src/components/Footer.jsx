const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Virtual Card", href: "#cards" },
  { label: "Physical Card", href: "#cards" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#cards" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Blog", href: "#" },
];

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Compliance", href: "#" },
];

const socials = [
  { label: "X", href: "#" },
  { label: "IG", href: "#" },
  { label: "in", href: "#" },
  { label: "YT", href: "#" },
];

const payments = ["Visa", "Mastercard", "Apple Pay", "Google Pay"];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLogo() {
  return (
    <img
      src="/Fiper_Logo_white2.png"
      alt="Fiper"
      className="h-20 w-auto object-contain"
    />
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <a href="#home">
              <FooterLogo />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Turn trading profits into real-world purchasing power.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[11px] font-semibold text-zinc-500 transition-all duration-200 hover:text-white hover:border-white/25"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        {/* Accepted payments */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="text-center mb-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-600 mb-3">
              Accepted Payments
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {payments.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm font-medium text-zinc-400"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-zinc-600">
              &copy; 2026 Fiper. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
