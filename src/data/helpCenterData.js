import {
  CreditCard,
  Layers,
  ArrowUpDown,
  DollarSign,
  ShoppingBag,
  Landmark,
  ShieldCheck,
  Truck,
  AlertCircle,
} from "lucide-react";

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: CreditCard,
    faqs: [
      {
        q: "What is the Fiper Card?",
        a: "The Fiper Card is a payment card linked to your account on the Fiper platform. It allows you to make online payments, use digital wallets such as Apple Pay and Google Pay, use ATMs, and transfer funds easily between your trading account and the card instantly.",
      },
      {
        q: "What is the difference between the Virtual Card and the Physical Card?",
        a: "Virtual Card: Activated within minutes, supports Apple Pay and Google Pay, can be used for online payments and digital wallets. Physical Card: A plastic card shipped to your address, can be used in stores and ATMs, supports contactless NFC payments.",
      },
      {
        q: "How long does it take to activate the card?",
        a: "The card is usually activated within about 5 minutes after completing the request and approval process. The physical card requires several days to be shipped to your registered address.",
      },
      {
        q: "Is the Fiper Card a bank account?",
        a: "No. The Fiper Card is not a bank account. It is a payment card linked to your account within the Fiper platform.",
      },
      {
        q: "Is the card available in all countries?",
        a: "The card is available to all Fiper clients, except for geographically restricted countries.",
      },
    ],
  },
  {
    id: "virtual-vs-physical",
    title: "Virtual vs Physical Cards",
    icon: Layers,
    faqs: [
      {
        q: "What are the card issuance fees?",
        a: "Virtual Card: $50 one-time fee ($30 loaded onto your card balance, actual cost $20). Physical Card: $100 one-time fee.",
      },
      {
        q: "Are card issuance fees refundable?",
        a: "No. Card issuance fees are not refundable once the card has been issued.",
      },
      {
        q: "What is the validity period of the card?",
        a: "The card validity period is 3 years from the date of issuance.",
      },
      {
        q: "Can I own more than one card?",
        a: "Yes. The maximum is two cards. A user can have one virtual card and one physical card at the same time.",
      },
      {
        q: "Does the card support Apple Pay?",
        a: "Yes. The virtual card supports Apple Pay.",
      },
      {
        q: "Does the card support Google Pay?",
        a: "Yes. The virtual card supports Google Pay.",
      },
      {
        q: "Does the physical card support Apple Pay or Google Pay?",
        a: "No. The physical card does not currently support Apple Pay or Google Pay.",
      },
      {
        q: "Can the card be used for contactless payments?",
        a: "Virtual Card: Can be used through Apple Pay and Google Pay for contactless payments. Physical Card: Supports contactless NFC payments directly via the card.",
      },
    ],
  },
  {
    id: "topup-transfers",
    title: "Top-up & Transfers",
    icon: ArrowUpDown,
    faqs: [
      {
        q: "How can I top up the card?",
        a: "You can top up the card through the client area: 1) Login to Fiper CRM, 2) Go to the Fiper Card section, 3) Choose the card, 4) Click on Deposit to Card, 5) Enter the amount and submit.",
      },
      {
        q: "What are the card top-up fees?",
        a: "The top-up fee from your Fiper account to the card is 1.7% of the top-up amount.",
      },
      {
        q: "Can I transfer money from the card back to my account?",
        a: "Yes. You can transfer funds from the card to your Fiper account: 1) Login to Fiper CRM, 2) Go to the Fiper Card section, 3) Choose the card, 4) Click Withdraw Card to Account, 5) Enter the amount and submit. Fiper does not charge any fees for this operation.",
      },
      {
        q: "Is there a maximum top-up limit?",
        a: "The maximum top-up from your Fiper account to the card is $2,000 per week. This limit applies only to card loading, not to card usage. Example: If you load the card with $2,000 weekly for several weeks, you can make a payment of $4,000 or more without any issue.",
      },
      {
        q: "Can the card be topped up multiple times per week?",
        a: "Yes. As long as the total weekly top-up does not exceed $2,000.",
      },
      {
        q: "Can funds be transferred from the card to another card?",
        a: "No. However, you can transfer the funds back to your Fiper trading account and then send them to another client using the P2P transfer feature.",
      },
      {
        q: "Can the card receive funds?",
        a: "No. The card cannot receive funds directly. However, funds can be received in your Fiper trading account via P2P transfers.",
      },
    ],
  },
  {
    id: "fees-limits",
    title: "Fees & Limits",
    icon: DollarSign,
    faqs: [
      {
        q: "What are the transaction fees?",
        a: "A fixed fee is applied to each transaction ranging between $0.30 – $0.40 per transaction, depending on the type of transaction and payment currency. This fee applies regardless of the transaction amount (whether you pay $1 or $1,000).",
      },
      {
        q: "How is the exchange rate calculated?",
        a: "Exchange rates are determined based on the card network exchange rate (Visa or Mastercard) at the time the transaction is processed.",
      },
      {
        q: "Why does the charged amount sometimes differ from the purchase amount?",
        a: "A small difference may appear due to: currency conversion, transaction fees, or exchange rate differences between authorization and settlement time.",
      },
      {
        q: "Are there monthly card fees?",
        a: "No. There are no monthly fees.",
      },
      {
        q: "Are there inactivity fees?",
        a: "No. There are no inactivity fees.",
      },
      {
        q: "Are there international payment fees?",
        a: "Exchange rates may vary for currencies other than the US dollar.",
      },
      {
        q: "Are there replacement card fees?",
        a: "Yes. A new card issuance fee will apply.",
      },
    ],
  },
  {
    id: "payments-usage",
    title: "Payments & Usage",
    icon: ShoppingBag,
    faqs: [
      {
        q: "Can the card be used everywhere?",
        a: "Yes. The card can be used at all stores and websites that accept Visa or Mastercard.",
      },
      {
        q: "Can the card be used for payments in regular stores?",
        a: "Yes. The card can be used in physical stores or online as long as the merchant accepts international cards. If the virtual Mastercard is declined, you may try the other card (Visa), which is often accepted.",
      },
      {
        q: "Can the card be used in apps like Uber, Amazon, or Netflix?",
        a: "In most cases, our virtual or physical cards are accepted on these platforms. If a transaction is declined, you may try using the other card.",
      },
      {
        q: "Can the card be used to pay in different currencies?",
        a: "Yes. The card can be used with any official currency. Please note that exchange rates may vary against the US dollar.",
      },
      {
        q: "Can the card be used while traveling abroad?",
        a: "Yes. The card can be used while traveling with any local or international currency.",
      },
      {
        q: "Can payments be made without internet?",
        a: "Virtual Card: If connected to Apple Pay or Google Pay, payments can be made normally. Physical Card: Does not require internet for payments, but managing or topping up the card requires internet access.",
      },
      {
        q: "Can the card be linked to accounts like PayPal?",
        a: "Yes. However, if the card is declined, you may try linking the other card.",
      },
      {
        q: "Can the card be used if the balance is zero?",
        a: "No. The card cannot be used unless there is sufficient balance available.",
      },
      {
        q: "What happens if the transaction amount exceeds the card balance?",
        a: "The transaction will be declined and a $0.50 penalty fee will be applied.",
      },
      {
        q: "What does \"Pending\" status mean?",
        a: "It means that the transaction has been authorized but not yet settled by the merchant. It usually changes to \"Completed\" after settlement is finalized.",
      },
    ],
  },
  {
    id: "atm-withdrawals",
    title: "ATM & Withdrawals",
    icon: Landmark,
    faqs: [
      {
        q: "Can the card be used to withdraw cash from ATMs?",
        a: "Yes. The physical card can be used to withdraw cash from ATMs.",
      },
      {
        q: "Are there ATM withdrawal fees?",
        a: "Fiper does not charge ATM withdrawal fees. However, please note that the card is issued from outside your country, so using the card in your country may be classified as an international card transaction. Therefore, the local bank or ATM operator may apply their own fees.",
      },
    ],
  },
  {
    id: "security-lost-cards",
    title: "Security & Lost Cards",
    icon: ShieldCheck,
    faqs: [
      {
        q: "What should I do if I lose my card?",
        a: "The first step is to log into your card dashboard and freeze the card using the \"Freeze Card\" option. After that, you can contact support by creating a Support Ticket for further assistance.",
      },
      {
        q: "Can the card be replaced if it is lost?",
        a: "After freezing the card, you can open a support ticket and you will be guided through: the card replacement procedure and any issuance or shipping fees related to the new card if applicable.",
      },
      {
        q: "Can my card details be stolen during online payments?",
        a: "This depends on the security level of the website where the payment is made, which is outside Fiper's control.",
      },
      {
        q: "What should I do if my card is used without my authorization?",
        a: "Immediately freeze the card from your client area and open a support ticket for investigation.",
      },
      {
        q: "Can I temporarily disable the card?",
        a: "Yes. You can activate or deactivate the \"Freeze Card\" option at any time.",
      },
      {
        q: "Can I change the card PIN multiple times?",
        a: "Yes. The PIN can be updated from the dashboard of the physical card. The virtual card does not have a PIN.",
      },
      {
        q: "Will I receive a notification for every transaction?",
        a: "If you enable WhatsApp notifications, you will receive alerts for every transaction. Otherwise, you can view all transactions from the card dashboard.",
      },
    ],
  },
  {
    id: "shipping-delivery",
    title: "Shipping & Delivery",
    icon: Truck,
    faqs: [
      {
        q: "Can the shipping address be changed after ordering?",
        a: "You may contact your account manager to check if the shipment direction can be modified.",
      },
      {
        q: "What happens if the card does not arrive?",
        a: "If the card is returned to the company, it will be resent using alternative delivery methods.",
      },
      {
        q: "Can I collect the card from a company office?",
        a: "This depends on your location and whether local partners are available in your country.",
      },
      {
        q: "How long does it take to issue a replacement card?",
        a: "After cancelling the previous card, a new card can usually be issued in 5–8 minutes. However, the physical card may take several days to arrive.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: AlertCircle,
    faqs: [
      {
        q: "Why was my transaction declined even though I have enough balance?",
        a: "The merchant may not support this type of card or may not accept international cards.",
      },
      {
        q: "What should I do if a payment was deducted but the transaction did not complete?",
        a: "After confirming with the merchant that the transaction was cancelled, the amount will appear as a refund on your card within 3–5 business days.",
      },
      {
        q: "Why does the card not appear in Apple Pay or Google Pay?",
        a: "After activating the card, please wait 30 minutes before attempting to add it to your digital wallet.",
      },
      {
        q: "Can the card be cancelled permanently?",
        a: "Yes. You can open a support ticket and request cancellation of the specific card.",
      },
      {
        q: "What happens to the balance if the card is cancelled?",
        a: "The remaining balance can be returned to your Fiper trading account at any time without fees.",
      },
    ],
  },
];

export default categories;
