# AgroSupply Backend

This backend provides a simple Express API for the AgroSupply frontend.

## Setup

1. Open a terminal in `backend/`
2. Run `npm install`
3. Start the backend server with `npm run dev`

## API Endpoints

- `GET /api/products` - returns product catalog
- `GET /api/categories` - returns product categories
- `GET /api/products/:id` - returns a single product
- `POST /api/register` - register a new user
- `POST /api/login` - log in an existing user
- `POST /api/orders` - submit an order

## Notes

The frontend is configured to proxy `/api` to `http://localhost:4000` while running Vite.
