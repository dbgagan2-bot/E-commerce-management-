// src/types/index.ts

export interface Product {
  id: number;
  name: string;
  category: "Pesticides" | "Fertilizers" | "Tools & Equipment";
  subcategory: string;
  price: number;
  unit: string;
  brand: string;
  sku: string;
  rating: number;
  reviews: number;
  badge?: string;
  icon: string;
  description: string;
  specs: string[];
  inStock: number;
  weight: string;
  usage?: string;
  dosage?: string;
}

export interface CartItem extends Product {
  qty: number;
}