"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, MapPinned, PackageCheck, Smartphone, Truck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinkButton } from "@/components/Button";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

const paymentMethods = [
  { Icon: Smartphone, label: "UPI" },
  { Icon: CreditCard, label: "Card" },
  { Icon: PackageCheck, label: "Cash on Delivery" }
];

const deliveryMethods = [
  { id: "standard", title: "Standard Delivery", text: "3-5 business days", price: "Free over $150" },
  { id: "express", title: "Express Delivery", text: "1-2 business days", price: "$18" }
];

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function detectCardBrand(value: string) {
  const digits = value.replace(/\D/g, "");
  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^(60|65|81|82|508|6521)/.test(digits)) return "Rupay";
  return "Card";
}

const expiryMonths = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0"));
const expiryYears = Array.from({ length: 10 }, (_, index) => String(2026 + index));

const indianStates = ["Delhi", "Maharashtra", "Uttar Pradesh", "Karnataka", "Gujarat", "Tamil Nadu", "Rajasthan", "West Bengal", "Telangana", "Kerala"];

type ShippingAddress = {
  country: string;
  fullName: string;
  mobile: string;
  email: string;
  pinCode: string;
  building: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  fullAddress: string;
};

type AddressErrors = Partial<Record<keyof ShippingAddress, string>>;

const initialAddress: ShippingAddress = {
  country: "India",
  fullName: "",
  mobile: "",
  email: "",
  pinCode: "",
  building: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
  fullAddress: ""
};

const demoAddress: ShippingAddress = {
  country: "India",
  fullName: "Aditya Kumar",
  mobile: "9876543210",
  email: "aditya@example.com",
  pinCode: "110001",
  building: "Flat 204, Lotus Heights",
  area: "Connaught Place",
  landmark: "Near Metro Gate 4",
  city: "New Delhi",
  state: "Delhi",
  fullAddress: "Flat 204, Lotus Heights, Connaught Place, New Delhi, Delhi 110001"
};

function validateAddress(address: ShippingAddress) {
  const errors: AddressErrors = {};

  if (!address.country) errors.country = "Country is required";
  if (!address.fullName.trim()) errors.fullName = "Full name is required";
  if (!/^\d{10}$/.test(address.mobile)) errors.mobile = "Enter valid mobile number";
  if (!address.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) errors.email = "Enter valid email address";
  if (!/^\d{6}$/.test(address.pinCode)) errors.pinCode = "PIN code must be 6 digits";
  if (!address.building.trim()) errors.building = "Flat / house details are required";
  if (!address.area.trim()) errors.area = "Area / street is required";
  if (!address.city.trim()) errors.city = "Town / city is required";
  if (!address.state) errors.state = "State is required";
  if (!address.fullAddress.trim()) errors.fullAddress = "Full address is required";

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, isReady } = useCart();
  const redirectedForEmptyCart = useRef(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [address, setAddress] = useState<ShippingAddress>(initialAddress);
  const [addressTouched, setAddressTouched] = useState<Partial<Record<keyof ShippingAddress, boolean>>>({});
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiMessage, setUpiMessage] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = deliveryMethod === "express" ? 18 : subtotal > 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const cardBrand = useMemo(() => detectCardBrand(cardNumber), [cardNumber]);
  const addressErrors = useMemo(() => validateAddress(address), [address]);
  const canPlaceOrder = items.length > 0 && Object.keys(addressErrors).length === 0 && Boolean(paymentMethod);

  useEffect(() => {
    if (!isReady || items.length > 0 || redirectedForEmptyCart.current) return;
    redirectedForEmptyCart.current = true;
    sessionStorage.setItem("velora-cart-message", "Your cart is empty");
    router.replace("/cart");
  }, [isReady, items.length, router]);

  function setAddressField(field: keyof ShippingAddress, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
  }

  function markAddressTouched(field: keyof ShippingAddress) {
    setAddressTouched((current) => ({ ...current, [field]: true }));
  }

  function shouldShowAddressError(field: keyof ShippingAddress) {
    const hasTypedValue = Boolean(address[field]);
    const validatesWhileTyping = field === "mobile" || field === "pinCode" || field === "email";
    return Boolean(addressErrors[field] && (addressTouched[field] || (validatesWhileTyping && hasTypedValue)));
  }

  function addressInputClass(field: keyof ShippingAddress) {
    const hasError = shouldShowAddressError(field);
    return `focus-ring min-h-12 rounded-2xl border bg-transparent px-4 ${
      hasError ? "border-red-500" : "border-black/10 dark:border-white/10"
    }`;
  }

  function addressError(field: keyof ShippingAddress) {
    return shouldShowAddressError(field) ? <p className="text-xs font-bold text-red-600">{addressErrors[field]}</p> : null;
  }

  function verifyUpi() {
    const isValidUpi = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim());
    setUpiMessage(isValidUpi ? "UPI ID looks good." : "Enter a valid UPI ID, like name@upi.");
  }

  if (!isReady || items.length === 0) return null;

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-28 pt-12 sm:px-6 lg:grid-cols-[1fr_400px] lg:px-8 lg:pb-12">
      <div>
        <h1 className="text-5xl font-black">Checkout</h1>
        <div className="mt-6 grid gap-6">
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Shipping address</h2>
              <button
                type="button"
                onClick={() => {
                  setAddress(demoAddress);
                  setAddressTouched({});
                }}
                className="focus-ring flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-accent dark:bg-white/10"
              >
                <MapPinned size={17} /> Auto-fill saved address
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1">
                <select value={address.country} onChange={(event) => setAddressField("country", event.target.value)} onBlur={() => markAddressTouched("country")} className={addressInputClass("country")}>
                  <option value="India">India</option>
                </select>
                {addressError("country")}
              </div>
              <div className="grid gap-1">
                <input value={address.fullName} onChange={(event) => setAddressField("fullName", event.target.value)} onBlur={() => markAddressTouched("fullName")} placeholder="Full Name" className={addressInputClass("fullName")} />
                {addressError("fullName")}
              </div>
              <div className="grid gap-1">
                <input value={address.mobile} onChange={(event) => setAddressField("mobile", event.target.value.replace(/\D/g, "").slice(0, 10))} onBlur={() => markAddressTouched("mobile")} inputMode="numeric" placeholder="Mobile Number" className={addressInputClass("mobile")} />
                {addressError("mobile")}
              </div>
              <div className="grid gap-1">
                <input value={address.email} onChange={(event) => setAddressField("email", event.target.value)} onBlur={() => markAddressTouched("email")} type="email" placeholder="Email Address" className={addressInputClass("email")} />
                {addressError("email")}
              </div>
              <div className="grid gap-1">
                <input value={address.pinCode} onChange={(event) => setAddressField("pinCode", event.target.value.replace(/\D/g, "").slice(0, 6))} onBlur={() => markAddressTouched("pinCode")} inputMode="numeric" placeholder="PIN Code" className={addressInputClass("pinCode")} />
                {addressError("pinCode")}
              </div>
              <div className="grid gap-1">
                <input value={address.building} onChange={(event) => setAddressField("building", event.target.value)} onBlur={() => markAddressTouched("building")} placeholder="Flat / House No / Building / Apartment" className={addressInputClass("building")} />
                {addressError("building")}
              </div>
              <div className="grid gap-1">
                <input value={address.area} onChange={(event) => setAddressField("area", event.target.value)} onBlur={() => markAddressTouched("area")} placeholder="Area / Street / Sector / Village" className={addressInputClass("area")} />
                {addressError("area")}
              </div>
              <div className="grid gap-1">
                <input value={address.landmark} onChange={(event) => setAddressField("landmark", event.target.value)} placeholder="Landmark (Optional)" className="focus-ring min-h-12 rounded-2xl border border-black/10 bg-transparent px-4 dark:border-white/10" />
              </div>
              <div className="grid gap-1">
                <input value={address.city} onChange={(event) => setAddressField("city", event.target.value)} onBlur={() => markAddressTouched("city")} placeholder="Town / City" className={addressInputClass("city")} />
                {addressError("city")}
              </div>
              <div className="grid gap-1">
                <select value={address.state} onChange={(event) => setAddressField("state", event.target.value)} onBlur={() => markAddressTouched("state")} className={addressInputClass("state")}>
                  <option value="">State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {addressError("state")}
              </div>
              <div className="grid gap-1 sm:col-span-2">
                <textarea value={address.fullAddress} onChange={(event) => setAddressField("fullAddress", event.target.value)} onBlur={() => markAddressTouched("fullAddress")} placeholder="Full Address" className={`focus-ring min-h-28 rounded-2xl border bg-transparent p-4 ${shouldShowAddressError("fullAddress") ? "border-red-500" : "border-black/10 dark:border-white/10"}`} />
                {addressError("fullAddress")}
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h2 className="text-2xl font-black">Billing address</h2>
            <label className="mt-4 flex items-center gap-3 text-sm font-bold">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-violet-600" /> Same as shipping address
            </label>
          </div>
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h2 className="text-2xl font-black">Delivery method</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {deliveryMethods.map(({ id, title, text, price }) => (
                <button
                  key={id}
                  type="button"
                  role="button"
                  tabIndex={0}
                  onClick={() => setDeliveryMethod(id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setDeliveryMethod(id);
                    }
                  }}
                  className={`focus-ring cursor-pointer rounded-2xl border p-4 text-left transition hover:border-accent dark:border-white/10 ${
                    deliveryMethod === id ? "border-accent bg-violet-50 shadow-lg shadow-violet-500/10 dark:bg-white/10" : "border-black/10"
                  }`}
                >
                  <Truck className="mb-3 text-accent" />
                  <p className="font-black">{title}</p>
                  <p className="text-sm text-neutral-500">{text}</p>
                  <p className="mt-2 text-sm font-bold">{price}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h2 className="text-2xl font-black">Payment section</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {paymentMethods.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setPaymentMethod(label)}
                  className={`focus-ring rounded-2xl border p-4 text-left font-bold transition hover:border-accent dark:border-white/10 ${
                    paymentMethod === label ? "border-accent bg-violet-50 text-accent dark:bg-white/10" : "border-black/10"
                  }`}
                >
                  <Icon className="mb-3 text-accent" /> {label}
                </button>
              ))}
            </div>
            {paymentMethod === "UPI" ? (
              <div className="mt-5 grid gap-3 rounded-2xl border border-black/10 p-4 transition dark:border-white/10 sm:grid-cols-[1fr_auto] sm:items-center">
                <input
                  value={upiId}
                  onChange={(event) => {
                    setUpiId(event.target.value);
                    setUpiMessage("");
                  }}
                  placeholder="name@upi"
                  className="focus-ring min-h-12 rounded-full border border-black/10 bg-transparent px-4 dark:border-white/10"
                />
                <button type="button" onClick={verifyUpi} className="focus-ring min-h-12 rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:bg-accent dark:bg-white dark:text-ink dark:hover:bg-accent dark:hover:text-white">
                  Verify
                </button>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 sm:col-span-2">Supported apps: Google Pay / PhonePe / Paytm</p>
                {upiMessage ? <p className={`text-sm font-bold sm:col-span-2 ${upiMessage === "UPI ID looks good." ? "text-accent" : "text-red-600"}`}>{upiMessage}</p> : null}
              </div>
            ) : null}
            {paymentMethod === "Card" ? (
              <div className="mt-5 grid gap-3 rounded-2xl border border-black/10 p-4 transition dark:border-white/10 sm:grid-cols-2 sm:items-center">
                <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
                  <h3 className="font-black">Add a new credit or debit card</h3>
                  {cardNumber ? (
                    <span className="rounded-full bg-ink px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white dark:bg-white dark:text-ink">{cardBrand}</span>
                  ) : null}
                </div>
                <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                  Card Number
                  <input
                    value={cardNumber}
                    onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    className="focus-ring min-h-12 rounded-full border border-black/10 bg-transparent px-4 font-normal dark:border-white/10"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                  Cardholder Name
                  <input
                    value={cardHolder}
                    onChange={(event) => setCardHolder(event.target.value)}
                    placeholder="Cardholder Name"
                    className="focus-ring min-h-12 rounded-full border border-black/10 bg-transparent px-4 font-normal dark:border-white/10"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Expiry Month
                  <select
                    value={expiryMonth}
                    onChange={(event) => setExpiryMonth(event.target.value)}
                    className="focus-ring min-h-12 rounded-full border border-black/10 bg-transparent px-4 font-normal dark:border-white/10"
                  >
                    <option value="">Month</option>
                    {expiryMonths.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Expiry Year
                  <select
                    value={expiryYear}
                    onChange={(event) => setExpiryYear(event.target.value)}
                    className="focus-ring min-h-12 rounded-full border border-black/10 bg-transparent px-4 font-normal dark:border-white/10"
                  >
                    <option value="">Year</option>
                    {expiryYears.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  CVV
                  <input
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, cardBrand === "Amex" ? 4 : 3))}
                    inputMode="numeric"
                    placeholder="123"
                    className="focus-ring min-h-12 rounded-full border border-black/10 bg-transparent px-4 font-normal dark:border-white/10"
                  />
                </label>
              </div>
            ) : null}
            {paymentMethod === "Cash on Delivery" ? (
              <div className="mt-5 rounded-2xl border border-black/10 p-4 text-sm leading-6 text-neutral-500 transition dark:border-white/10 dark:text-neutral-400">
                Pay safely when your order arrives. Keep the exact amount ready for a faster handoff.
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-luxury dark:bg-white/5">
        <h2 className="text-2xl font-black">Order summary</h2>
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between gap-3 text-sm">
              <span>{item.product.name} × {item.quantity}</span>
              <b>{formatCurrency(item.product.price * item.quantity)}</b>
            </div>
          ))}
        </div>
        <input placeholder="Promo code" className="focus-ring mt-5 min-h-12 w-full rounded-full border border-black/10 bg-transparent px-4 dark:border-white/10" />
        <div className="mt-5 grid gap-3 border-t border-black/10 pt-4 text-sm dark:border-white/10">
          <div className="flex justify-between"><span>Product total</span><b>{formatCurrency(subtotal)}</b></div>
          <div className="flex justify-between"><span>Shipping fee</span><b>{shipping ? formatCurrency(shipping) : "Free"}</b></div>
          <div className="flex justify-between"><span>GST / tax</span><b>{formatCurrency(tax)}</b></div>
          <div className="flex justify-between text-lg font-black"><span>Final total</span><b>{formatCurrency(total)}</b></div>
        </div>
        {canPlaceOrder ? (
          <Link href="/order-success" onClick={clearCart} className="focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-white transition hover:-translate-y-0.5">
            Place order
          </Link>
        ) : (
          <button type="button" disabled className="mt-6 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-white opacity-50">
            Place order
          </button>
        )}
        <LinkButton href="/cart" variant="ghost" className="mt-3 w-full">Back to cart</LinkButton>
      </aside>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white p-4 dark:border-white/10 dark:bg-ink lg:hidden">
        {canPlaceOrder ? (
          <Link href="/order-success" onClick={clearCart} className="focus-ring flex min-h-12 items-center justify-center rounded-full bg-accent font-bold text-white">
            Pay {formatCurrency(total)}
          </Link>
        ) : (
          <button type="button" disabled className="flex min-h-12 cursor-not-allowed items-center justify-center rounded-full bg-accent font-bold text-white opacity-50">
            Pay {formatCurrency(total)}
          </button>
        )}
      </div>
    </section>
  );
}
