// src/App.tsx
import { useState } from "react";
import type { Product, CartItem } from "./types";
import { PRODUCTS, CATEGORIES } from "./data/products";
import AuthPage from "./components/AuthPage";
import Navbar from "./components/Navbar";
import HeroStrip from "./components/HeroStrip";
import Toolbar from "./components/Toolbar";
import ProductCard from "./components/ProductCard";
import CartPanel from "./components/CartPanel";
import Toast from "./components/Toast";
import CheckoutPage from "./components/CheckoutPage";
import InfoPage from "./components/InfoPage";
import ProductDetails from "./components/ProductDetails";

interface SavedUser {
  name: string;
  email: string;
  password: string;
}

type Page = "shop" | "checkout" | "catalog" | "bulk" | "support" | "success";

export default function App() {
  const [page, setPage] = useState<Page>("shop");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [savedUser, setSavedUser] = useState<SavedUser | null>(null);


  const filtered = PRODUCTS
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === product.id);
      if (ex) return prev.map(c =>
        c.id === product.id ? { ...c, qty: c.qty + 1 } : c
      );
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.icon} ${product.name} added to cart`);
    setTimeout(() => setToast(null), 2200);
  };

  const handleBuyNow = (product: Product) => {
    setBuyNowItem({ ...product, qty: 1 });
    setCartOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setSavedUser({ name, email, password });
  };

  const handleLogin = (name: string, _email: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleConfirmOrder = () => {
    setCart([]);
    setBuyNowItem(null);
    setCartOpen(false);
    setPage("success");
  };

  const handleNavClick = (p: string) => {
    setCartOpen(false);
    setPage(p as Page);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setCart([]);
    setBuyNowItem(null);
    setCartOpen(false);
    setPage("shop");
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  // ── Auth Gate ──────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <AuthPage
        savedUser={savedUser}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  // ── Checkout Page ──────────────────────────────────────
  if (page === "checkout") {
    const checkoutItems = buyNowItem ? [buyNowItem] : cart;
    return (
      <>
        <Navbar
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
          onNavClick={handleNavClick}
          userName={userName}
          onLogout={handleLogout}
        />
        <CheckoutPage
          cart={checkoutItems}
          onBack={() => { setBuyNowItem(null); setPage("shop"); }}
          onConfirm={handleConfirmOrder}
        />
      </>
    );
  }

  // ── Info Pages ─────────────────────────────────────────
  if (
    page === "catalog" ||
    page === "bulk"    ||
    page === "support" ||
    page === "success"
  ) {
    return (
      <>
        <Navbar
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
          onNavClick={handleNavClick}
          userName={userName}
          onLogout={handleLogout}
        />
        <InfoPage page={page} onBack={() => setPage("shop")} />
      </>
    );
  }

  // ── Shop Page ──────────────────────────────────────────
  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavClick={handleNavClick}
        userName={userName}
        onLogout={handleLogout}
      />
      <HeroStrip
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categories={CATEGORIES}
      />
      <Toolbar
        search={search}
        onSearch={setSearch}
        sortBy={sortBy}
        onSort={setSortBy}
        resultCount={filtered.length}
      />

      <div style={{ padding: "0 28px 60px" }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "var(--muted)"
          }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🔬</div>
            <p>No products match your search.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
            gap: 16
          }}>
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {cartOpen && (
        <CartPanel
          cart={buyNowItem ? [buyNowItem] : cart}
          isBuyNow={!!buyNowItem}
          buyNowProduct={buyNowItem}
          onClose={() => {
            setCartOpen(false);
            setBuyNowItem(null);
          }}
          onUpdateQty={(id, delta) => {
            if (buyNowItem) {
              setBuyNowItem(prev =>
                prev ? { ...prev, qty: Math.max(1, prev.qty + delta) } : prev
              );
            } else {
              setCart(prev => prev.map(c =>
                c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c
              ));
            }
          }}
          onRemove={id => {
            if (buyNowItem && buyNowItem.id === id) {
              setBuyNowItem(null);
              setCartOpen(false);
            } else {
              setCart(prev => prev.filter(c => c.id !== id));
            }
          }}
          onCheckout={() => {
            setCartOpen(false);
            setPage("checkout");
          }}
        />
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {toast && <Toast message={toast} />}
    </>
  );
}