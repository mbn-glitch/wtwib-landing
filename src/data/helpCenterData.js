import {
  CreditCard, Layers, ArrowUpDown, DollarSign,
  ShoppingBag, Landmark, ShieldCheck, Truck, AlertCircle,
} from "lucide-react";

const categoryDefs = [
  { id: "getting-started", icon: CreditCard, titleKey: "cat1", prefix: "gs", count: 5 },
  { id: "virtual-vs-physical", icon: Layers, titleKey: "cat2", prefix: "vp", count: 8 },
  { id: "topup-transfers", icon: ArrowUpDown, titleKey: "cat3", prefix: "tt", count: 7 },
  { id: "fees-limits", icon: DollarSign, titleKey: "cat4", prefix: "fl", count: 7 },
  { id: "payments-usage", icon: ShoppingBag, titleKey: "cat5", prefix: "pu", count: 10 },
  { id: "atm-withdrawals", icon: Landmark, titleKey: "cat6", prefix: "aw", count: 2 },
  { id: "security-lost-cards", icon: ShieldCheck, titleKey: "cat7", prefix: "sl", count: 7 },
  { id: "shipping-delivery", icon: Truck, titleKey: "cat8", prefix: "sd", count: 4 },
  { id: "troubleshooting", icon: AlertCircle, titleKey: "cat9", prefix: "ts", count: 5 },
];

export function getCategories(t) {
  return categoryDefs.map((def) => ({
    id: def.id,
    icon: def.icon,
    title: t(`helpCenter.${def.titleKey}`),
    faqs: Array.from({ length: def.count }, (_, i) => ({
      q: t(`helpCenter.${def.prefix}_q${i + 1}`),
      a: t(`helpCenter.${def.prefix}_a${i + 1}`),
    })),
  }));
}

export default categoryDefs;
