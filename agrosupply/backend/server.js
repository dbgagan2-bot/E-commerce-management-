import express from "express";
import cors from "cors";
import { PRODUCTS, CATEGORIES } from "./data.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const users = [
  { name: "Agro Farmer", email: "farm@example.com", password: "agro1234" },
];
const orders = [];

app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

app.get("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }
  res.json(product);
});

app.get("/api/categories", (req, res) => {
  res.json(CATEGORIES);
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required." });
  }

  const existing = users.find((user) => user.email === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ message: "A user with that email already exists." });
  }

  const newUser = { name, email: email.toLowerCase(), password };
  users.push(newUser);
  res.status(201).json({ message: "Registration successful.", user: { name: newUser.name, email: newUser.email } });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = users.find((item) => item.email === email.toLowerCase() && item.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json({ name: user.name, email: user.email });
});

app.post("/api/orders", (req, res) => {
  const { name, email, items, total } = req.body;
  if (!name || !email || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order details are incomplete." });
  }

  const order = {
    id: orders.length + 1,
    name,
    email,
    items,
    total,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);

  res.status(201).json({ message: "Order received.", order });
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found." });
});

const startServer = (listenPort) => {
  const server = app.listen(listenPort, () => {
    console.log(`AgroSupply backend running at http://localhost:${listenPort}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const nextPort = listenPort + 1;
      if (listenPort === port) {
        console.warn(`Port ${listenPort} is in use. Trying ${nextPort} instead...`);
        startServer(nextPort);
      } else {
        console.error(`Port ${listenPort} is also in use. Please stop the running process or set PORT to a free port.`);
        process.exit(1);
      }
    } else {
      throw err;
    }
  });
};

startServer(port);
