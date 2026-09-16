# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # run the production build
npm run lint     # next lint (extends next/core-web-vitals)
```

There is no test suite configured in this project.

## Architecture

Next.js 14 App Router + TypeScript + Tailwind, mostly **backend-free**: all product/catalog data is mocked in `/lib`, and cart/wishlist state lives only in React Context + `localStorage`. There is no product/order database yet — the admin dashboard's Products/Orders/Enquiries tabs still simulate behavior against in-memory mock data (see the roadmap at the bottom of this file for migrating that to Supabase Postgres). Two exceptions are already real: checkout (test-mode Razorpay payments + order emails via Next.js API routes) and authentication (real Supabase Auth).

**Auth**: real Supabase Auth (email/password + Google), not mocked. `/login` (customer) and `/admin/login` (staff) both render `components/auth/AuthForm.tsx` with a `variant` prop — same form, different post-login redirect and (for `variant="admin"`) an extra `profiles.is_admin` check that signs the user back out if it's false. `context/AuthContext.tsx` (`useAuth()`) exposes `user`/`signOut` client-side, wraps the app in `app/layout.tsx`. Root `middleware.ts` (using `lib/supabase/middleware.ts`) refreshes the session cookie on every request and blocks `/account/*` (redirects to `/login`) and `/admin/*` (redirects to `/admin/login`, after checking `profiles.is_admin`) — `lib/supabase/client.ts` and `lib/supabase/server.ts` are the browser/server Supabase client factories for use elsewhere. The `profiles` table (id/full_name/phone/is_admin, RLS-protected, auto-inserted on signup via a trigger) is defined in `supabase/schema.sql` — run it once in the Supabase SQL Editor after creating a project; there's no self-serve way to become admin, that row's `is_admin` is flipped manually in the Supabase dashboard. Needs `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`; Google sign-in additionally needs the Google provider enabled in the Supabase dashboard (not in this repo's env vars).

**Payments & order emails**: `app/checkout/page.tsx` collects shipping details and a payment method (UPI / Card / COD). For UPI/Card, it POSTs to `app/api/razorpay/create-order/route.ts` (creates a Razorpay order server-side via `lib/razorpay.ts`), opens Razorpay Checkout.js in the browser restricted to that method, then POSTs the returned `razorpay_payment_id`/`order_id`/`signature` to `app/api/razorpay/verify/route.ts`, which HMAC-verifies the signature server-side before the order is treated as paid. COD skips Razorpay entirely. Once an order is confirmed (paid or COD), the client POSTs order details to `app/api/orders/route.ts`, which calls `lib/email.ts` (`sendOrderEmails`) to send two emails via `nodemailer`/SMTP: a confirmation to the customer and a notification to `orders@traditionalvastraa.com`, both rendered from templates in `lib/email-templates.ts`. All of this needs real secrets in `.env.local` (see `.env.example`): `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` (test-mode keys are fine — real transactions complete in Razorpay's sandbox, no real money moves) and `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASSWORD` for the `orders@traditionalvastraa.com` mailbox. Without them, `lib/razorpay.ts`/`lib/email.ts` throw clear errors rather than silently no-op-ing.

**Data flow / single source of truth**: `lib/products.ts` holds the entire product catalog as a typed array (shape defined in `lib/types.ts`) plus helper functions (`getAllProducts()`, etc.). Every page and component reads products through these helpers rather than fetching from an API. `lib/admin-data.ts` similarly mocks orders and customer enquiries for the admin dashboard. When adding a product, add an entry to the array in `lib/products.ts` and ensure `slug` is unique — it's used as the product detail page URL (`/product/[slug]`).

**Cart/Wishlist identity gotcha**: `CartItem`/cart operations key on `productId` (matching `Product.id`), not `slug`. Any code adding to cart or looking up cart contents needs the product's `id`, while page routing uses `slug` — don't conflate the two.

**Server/Client split**: Everything under `/app` is a Server Component by default. Anything interactive (`useState`, `onClick`, browser storage) is marked `"use client"` — this includes `Navbar.tsx`, everything in `context/`, and `ProductDetailClient.tsx`. Pages needing both SEO metadata (server-rendered) and interactivity split the work: e.g. `app/product/[slug]/page.tsx` stays a Server Component and renders the client component `ProductDetailClient` inside it. Follow this pattern for any new page that needs both.

**Context providers**: `CartContext` and `WishlistContext` wrap the app in `app/layout.tsx`; access them via the `useCart()` / `useWishlist()` hooks rather than prop drilling. Both persist to `localStorage` under the `traditional_vastraa_cart` / equivalent wishlist key, hydrating from storage in an effect (so initial render is empty, then hydrates — account for this if adding SSR-sensitive logic).

**Shop filtering**: `components/ShopPageContent.tsx` is shared by `/shop`, `/shop/clothing`, and `/shop/thread-bangles`. It reads filter/search state from URL search params (e.g. `?search=saree`) and filters the in-memory product list client-side — if a real backend is added, this is the place that would switch from client-side filtering to an API call.

**Admin dashboard**: `components/admin/AdminDashboard.tsx` (route `/admin`, guarded by `middleware.ts` + `/admin/login`) is a fully working UI (Overview/Products/Orders/Enquiries tabs) but all edits are still local `setState` and reset on page refresh — auth is real, data persistence isn't yet (see roadmap).

**Brand theme**: colors (maroon, gold, blush, cream, sage) and fonts (Playfair Display for headings, Poppins for body) are defined once in `tailwind.config.ts` under `theme.extend`. Reusable style classes (`.btn-primary`, `.btn-secondary`, `.btn-gold`, `.card`, `.section-title`, `.input-field`) live in `app/globals.css` under `@layer components` — prefer using/extending these over ad hoc Tailwind classes on new components.

**Images**: `next.config.js` only allows remote images from `images.unsplash.com`; local placeholder product images live in `public/products/`. Add any new remote image host to `images.remotePatterns` before using it.

## Path aliases

`@/*` maps to the project root (see `tsconfig.json`), e.g. `import { getAllProducts } from "@/lib/products"`.
