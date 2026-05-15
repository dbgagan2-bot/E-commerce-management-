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

The frontend is configured to proxy `/api` to the backend URL from `VITE_BACKEND_URL`, or `http://localhost:4000` by default while running Vite.

If port `4000` is already in use, start the backend on a different port and set the frontend proxy with:

```bash
set VITE_BACKEND_URL=http://localhost:4001
npm run dev
```
