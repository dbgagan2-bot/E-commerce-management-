// src/utils/currency.ts
export const USD_TO_INR = 83.5;

export const toINR = (usd: number): string => {
  const inr = usd * USD_TO_INR;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
};