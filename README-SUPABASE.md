# Burger Barn — Supabase version

## Setup
1. In Supabase SQL Editor run `sql/schema.sql` once.
2. Fill `.env` with Project URL, Publishable key and Secret key. Keep the Secret key private.
3. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
4. Run `npm install` then `npm start`.
5. Open `http://localhost:5000` for customers.
6. Open `http://localhost:5000/admin` for the restaurant dashboard.

The customer menu is loaded from the Supabase `products` table. Orders, order items and catering requests are stored in Supabase. Admin status changes are persisted.
