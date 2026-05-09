// src/components/InfoPage.tsx
interface Props {
  page: "catalog" | "bulk" | "support" | "success";
  onBack: () => void;
}

const PAGES = {
  catalog: {
    icon: "📋",
    title: "Product Catalog",
    content: [
      { heading: "🌾 What We Offer", body: "AgroSupply stocks 500+ certified agricultural inputs across pesticides, fertilizers, and farm equipment. All products are sourced directly from ISO-certified manufacturers." },
      { heading: "🧴 Pesticides", body: "Insecticides, Fungicides, Herbicides, Nematicides, Biopesticides, Acaricides — covering all major crops and pest types. All products come with full SDS documentation." },
      { heading: "🌱 Fertilizers", body: "NPK complexes, organic compost, micronutrients, biostimulants, and foliar sprays. Water-soluble and granular forms available for all soil types." },
      { heading: "🔧 Tools & Equipment", body: "Backpack sprayers, soil testing meters, drip irrigation kits, and more. Pro-grade equipment for small farms to large-scale operations." },
      { heading: "📦 Download Full Catalog", body: "Request our printed or PDF catalog by contacting our support team. Updated quarterly with new arrivals and seasonal products." },
    ]
  },
  bulk: {
    icon: "🏷️",
    title: "Bulk Orders",
    content: [
      { heading: "📦 Minimum Order Quantity", body: "Bulk pricing applies on orders above ₹50,000 or 100kg/100L. Contact our sales team for a custom quote tailored to your farm size." },
      { heading: "💰 Volume Discounts", body: "5% off on orders ₹50K–1L · 10% off on ₹1L–5L · 15% off on orders above ₹5L. Additional seasonal discounts available during Rabi and Kharif seasons." },
      { heading: "🚚 Delivery & Logistics", body: "Bulk orders are dispatched within 48 hours via our partner logistics network. Delivery available pan-India including rural areas. Cold-chain packaging for sensitive biologicals." },
      { heading: "📝 How to Place a Bulk Order", body: "Step 1: Add products to cart. Step 2: Proceed to checkout and select 'Bulk Order'. Step 3: Our team will contact you within 2 hours to confirm pricing and delivery schedule." },
      { heading: "📞 Dedicated Bulk Sales Line", body: "Call +91 98765 00001 (Mon–Sat, 9AM–6PM) or email bulk@agrosupply.in for immediate assistance with large orders." },
    ]
  },
  support: {
    icon: "📞",
    title: "Customer Support",
    content: [
      { heading: "🕐 Support Hours", body: "Our agronomy experts are available Monday to Saturday, 8AM to 8PM IST. Emergency crop advisory available 24/7 on WhatsApp." },
      { heading: "📱 Contact Channels", body: "Phone: +91 98765 43210 · WhatsApp: +91 98765 43211 · Email: support@agrosupply.in · Live Chat available on this website during business hours." },
      { heading: "🌾 Agronomy Advisory", body: "Not sure which product to use? Our certified agronomists provide free crop protection and nutrition advice. Share your crop type, growth stage, and problem for a personalized recommendation." },
      { heading: "🔄 Returns & Refunds", body: "Unused, sealed products can be returned within 7 days of delivery. Damaged or wrong items will be replaced immediately at no extra cost. Refunds processed within 3–5 business days." },
      { heading: "📋 FAQs", body: "Visit our knowledge base for dosage calculators, mixing guides, crop calendars, and application timing charts. Available in English, Hindi, Kannada, and Telugu." },
    ]
  },
  success: {
    icon: "✅",
    title: "Order Confirmed!",
    content: [
      { heading: "🎉 Thank you for your order!", body: "Your order has been successfully placed with AgroSupply. You will receive a confirmation SMS and email within the next 5 minutes." },
      { heading: "📦 What happens next?", body: "Our warehouse team will process and pack your order within 4 hours. You will receive a tracking link via SMS once your order is dispatched." },
      { heading: "🚚 Estimated Delivery", body: "Metro cities: 24–48 hours · Tier 2 cities: 48–72 hours · Rural areas: 3–5 business days. Expedited delivery available on request." },
      { heading: "📞 Need help?", body: "Call +91 98765 43210 or WhatsApp us with your order ID if you have any questions. Our team is available Monday–Saturday, 8AM–8PM." },
    ]
  }
};

export default function InfoPage({ page, onBack }: Props) {
  const data = PAGES[page];

  return (
    <div style={{ maxWidth: 760, margin: "40px auto", padding: "0 24px 80px" }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 14, cursor: "pointer", marginBottom: 24, fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", gap: 6 }}
      >
        ← Back to Shop
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <span style={{ fontSize: 48 }}>{data.icon}</span>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text)" }}>
          {data.title}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.content.map(({ heading, body }) => (
          <div
            key={heading}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24 }}
          >
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: "var(--accent)", marginBottom: 10 }}>
              {heading}
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, fontWeight: 300 }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      {page !== "success" && (
        <button
          onClick={onBack}
          style={{
            marginTop: 28, padding: "13px 32px", borderRadius: 10,
            border: "1px solid var(--accent)", background: "transparent",
            color: "var(--accent)", fontFamily: "'Syne',sans-serif",
            fontSize: 15, fontWeight: 700, cursor: "pointer"
          }}
        >
          ← Back to Shop
        </button>
      )}
      {page === "success" && (
        <button
          onClick={onBack}
          style={{
            marginTop: 28, padding: "13px 32px", borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg,#4caf50,#6dde6d)",
            color: "#0d1f0f", fontFamily: "'Syne',sans-serif",
            fontSize: 15, fontWeight: 800, cursor: "pointer"
          }}
        >
          🛒 Continue Shopping
        </button>
      )}
    </div>
  );
}