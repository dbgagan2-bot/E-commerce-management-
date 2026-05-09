// src/data/products.ts
// import { Product } from "../types";

import type { Product } from "../types";

export const CATEGORIES = 
["All", "Pesticides", "Fertilizers", "Tools & Equipment"];

export const PRODUCTS: Product[] = [
  // ── PESTICIDES ──────────────────────────────────────
  {
    id: 1, name: "AgroShield Pro Insecticide",
    category: "Pesticides", subcategory: "Insecticide",
    price: 34.99, unit: "500ml", brand: "AgroShield", sku: "PS-001",
    rating: 4.8, reviews: 214, badge: "Bestseller", icon: "🧴",
    description: "Broad-spectrum contact insecticide for aphids, thrips, and whiteflies.",
    specs: ["Active: Cypermethrin 10%", "Mode: Contact & Systemic", "Crops: Vegetables, Fruits", "PHI: 7 days"],
    inStock: 85, weight: "0.6 kg",
    
  },
  {
    id: 2, name: "FungoClear Fungicide",
    category: "Pesticides", subcategory: "Fungicide",
    price: 42.50, unit: "1L", brand: "FungoClear", sku: "PS-002",
    rating: 4.7, reviews: 139, badge: "Organic", icon: "🫙",
    description: "Systemic fungicide for powdery mildew, blight, and leaf spot.",
    specs: ["Active: Tebuconazole 25%", "Mode: Systemic", "Crops: Wheat, Tomato", "PHI: 14 days"],
    inStock: 60, weight: "1.1 kg",
    
  },
  {
    id: 3, name: "WeedOut Total Herbicide",
    category: "Pesticides", subcategory: "Herbicide",
    price: 28.00, unit: "1L", brand: "WeedOut", sku: "PS-003",
    rating: 4.6, reviews: 97, icon: "🧪",
    description: "Non-selective post-emergent herbicide for complete weed elimination.",
    specs: ["Active: Glyphosate 41%", "Mode: Systemic", "Application: Post-emergent", "Rain-fast: 4 hrs"],
    inStock: 120, weight: "1.2 kg",
    
    
  },
  {
    id: 4, name: "BioDefend Biopesticide",
    category: "Pesticides", subcategory: "Biopesticide",
    price: 38.75, unit: "500ml", brand: "BioDefend", sku: "PS-004",
    rating: 4.9, reviews: 178, badge: "100% Natural", icon: "🌿",
    description: "Neem-based biopesticide safe for beneficial insects and soil microbiome.",
    specs: ["Active: Azadirachtin 0.03%", "Mode: Repellent/IGR", "Crops: All crops", "PHI: 0 days"],
    inStock: 95, weight: "0.55 kg",
    
  },
  {
    id: 5, name: "MiteAway Acaricide",
    category: "Pesticides", subcategory: "Acaricide",
    price: 47.00, unit: "250ml", brand: "AgroShield", sku: "PS-005",
    rating: 4.6, reviews: 83, icon: "⚗️",
    description: "Powerful miticide for spider mite and red mite infestations.",
    specs: ["Active: Abamectin 1.8%", "Mode: Contact & Translaminar", "Crops: Cotton, Vegetables", "PHI: 3 days"],
    inStock: 40, weight: "0.3 kg",
    
  },

  // ── FERTILIZERS ─────────────────────────────────────
  {
    id: 6, name: "CropMax NPK 20-20-20",
    category: "Fertilizers", subcategory: "NPK Complex",
    price: 22.99, unit: "5 kg", brand: "CropMax", sku: "FT-001",
    rating: 4.9, reviews: 312, badge: "Bestseller", icon: "🌱",
    description: "Balanced water-soluble NPK fertilizer for all growth stages.",
    specs: ["N: 20% | P: 20% | K: 20%", "Form: Water Soluble", "pH: 5.5–6.5", "Crops: All crops"],
    inStock: 200, weight: "5 kg",
    
  },
  {
    id: 7, name: "BloomBoost Phosphorus",
    category: "Fertilizers", subcategory: "Phosphorus",
    price: 31.50, unit: "10 kg", brand: "BloomBoost", sku: "FT-002",
    rating: 4.7, reviews: 156, icon: "💐",
    description: "High-phosphorus formula to promote root development and flowering.",
    specs: ["N: 5% | P: 52% | K: 10%", "Form: Granular", "Application: Basal", "Crops: Flowering crops"],
    inStock: 110, weight: "10 kg",
  },
  {
    id: 8, name: "SoilVita Organic Compost",
    category: "Fertilizers", subcategory: "Organic",
    price: 18.00, unit: "25 kg", brand: "SoilVita", sku: "FT-003",
    rating: 4.8, reviews: 224, badge: "Certified Organic", icon: "🪱",
    description: "Enriched compost with humic acid for long-term soil health.",
    specs: ["OM: 40%+", "Humic Acid: 8%", "Form: Granular", "Crops: All crops"],
    inStock: 75, weight: "25 kg",
  },
  {
    id: 9, name: "MicroBoost Trace Elements",
    category: "Fertilizers", subcategory: "Micronutrients",
    price: 26.00, unit: "1 kg", brand: "MicroBoost", sku: "FT-004",
    rating: 4.6, reviews: 88, badge: "Chelated", icon: "⚡",
    description: "Chelated blend of Zn, Fe, Mn, Cu, Mo, B for micronutrient correction.",
    specs: ["Fe: 6% | Zn: 5% | Mn: 4%", "Form: Soluble Powder", "Application: Foliar/Drip", "pH: 4–7"],
    inStock: 145, weight: "1.1 kg",
  },
  {
    id: 10, name: "NitroMax Urea 46%",
    category: "Fertilizers", subcategory: "Nitrogen",
    price: 14.50, unit: "25 kg", brand: "NitroMax", sku: "FT-005",
    rating: 4.5, reviews: 197, icon: "🔵",
    description: "High-nitrogen urea prills for vegetative growth and green biomass.",
    specs: ["N: 46%", "Form: Prill/Granular", "Application: Broadcast", "Moisture: <0.5%"],
    inStock: 300, weight: "25 kg",
  },
  {
    id: 11, name: "FoliarFeed Liquid Seaweed",
    category: "Fertilizers", subcategory: "Biostimulant",
    price: 33.00, unit: "1L", brand: "OceanGrow", sku: "FT-006",
    rating: 4.9, reviews: 143, badge: "Premium", icon: "🌊",
    description: "Cold-processed seaweed extract rich in cytokinins and growth hormones.",
    specs: ["Seaweed Extract: 60%", "Auxins + Cytokinins", "Form: Liquid Concentrate", "Dilution: 1:500"],
    inStock: 55, weight: "1.1 kg",
  },

  // ── TOOLS & EQUIPMENT ───────────────────────────────
  {
    id: 12, name: "Pro Backpack Sprayer 16L",
    category: "Tools & Equipment", subcategory: "Sprayers",
    price: 89.00, unit: "each", brand: "SprayPro", sku: "TE-001",
    rating: 4.7, reviews: 201, badge: "Pro Grade", icon: "🎒",
    description: "Heavy-duty 16L backpack sprayer with brass nozzle and pressure gauge.",
    specs: ["Tank: 16L HDPE", "Pressure: 2–4 bar", "Nozzle: Brass adjustable", "Weight: 2.1 kg"],
    inStock: 45, weight: "2.1 kg",
  },
  {
    id: 13, name: "Soil pH & Moisture Meter",
    category: "Tools & Equipment", subcategory: "Testing",
    price: 24.99, unit: "each", brand: "SoilSense", sku: "TE-002",
    rating: 4.6, reviews: 118, icon: "📊",
    description: "3-in-1 digital meter for soil pH, moisture, and sunlight intensity.",
    specs: ["pH Range: 3.5–9.0", "Moisture: 1–10 scale", "Light: 0–2000 Lux", "No battery needed"],
    inStock: 90, weight: "0.15 kg",
  },
  {
    id: 14, name: "Drip Irrigation Kit 100m",
    category: "Tools & Equipment", subcategory: "Irrigation",
    price: 145.00, unit: "kit", brand: "AquaDrip", sku: "TE-003",
    rating: 4.8, reviews: 76, badge: "Saves 60% Water", icon: "💧",
    description: "Complete drip system for 100m row with pressure-compensating emitters.",
    specs: ["Coverage: 100m row", "Emitter: 2L/hr PC", "Main pipe: 16mm PE", "Filter: 120 mesh"],
    inStock: 22, weight: "4.5 kg",
  },
];