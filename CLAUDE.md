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

Next.js 14 App Router + TypeScript + Tailwind, deliberately built **backend-free**: all data is mocked in `/lib`, and cart/wishlist state lives only in React Context + `localStorage`. There is no database, auth, or payment integration — checkout, the admin dashboard, and account pages simulate real behavior against in-memory mock data.

**Data flow / single source of truth**: `lib/products.ts` holds the entire product catalog as a typed array (shape defined in `lib/types.ts`) plus helper functions (`getAllProducts()`, etc.). Every page and component reads products through these helpers rather than fetching from an API. `lib/admin-data.ts` similarly mocks orders and customer enquiries for the admin dashboard. When adding a product, add an entry to the array in `lib/products.ts` and ensure `slug` is unique — it's used as the product detail page URL (`/product/[slug]`).

**Cart/Wishlist identity gotcha**: `CartItem`/cart operations key on `productId` (matching `Product.id`), not `slug`. Any code adding to cart or looking up cart contents needs the product's `id`, while page routing uses `slug` — don't conflate the two.

**Server/Client split**: Everything under `/app` is a Server Component by default. Anything interactive (`useState`, `onClick`, browser storage) is marked `"use client"` — this includes `Navbar.tsx`, everything in `context/`, and `ProductDetailClient.tsx`. Pages needing both SEO metadata (server-rendered) and interactivity split the work: e.g. `app/product/[slug]/page.tsx` stays a Server Component and renders the client component `ProductDetailClient` inside it. Follow this pattern for any new page that needs both.

**Context providers**: `CartContext` and `WishlistContext` wrap the app in `app/layout.tsx`; access them via the `useCart()` / `useWishlist()` hooks rather than prop drilling. Both persist to `localStorage` under the `traditional_vastraa_cart` / equivalent wishlist key, hydrating from storage in an effect (so initial render is empty, then hydrates — account for this if adding SSR-sensitive logic).

**Shop filtering**: `components/ShopPageContent.tsx` is shared by `/shop`, `/shop/clothing`, and `/shop/thread-bangles`. It reads filter/search state from URL search params (e.g. `?search=saree`) and filters the in-memory product list client-side — if a real backend is added, this is the place that would switch from client-side filtering to an API call.

**Admin dashboard**: `components/admin/AdminDashboard.tsx` (route `/admin`) is a fully working UI (Overview/Products/Orders/Enquiries tabs) but all edits are local `setState` and reset on page refresh — there's no persistence or auth guard on this route yet.

**Brand theme**: colors (maroon, gold, blush, cream, sage) and fonts (Playfair Display for headings, Poppins for body) are defined once in `tailwind.config.ts` under `theme.extend`. Reusable style classes (`.btn-primary`, `.btn-secondary`, `.btn-gold`, `.card`, `.section-title`, `.input-field`) live in `app/globals.css` under `@layer components` — prefer using/extending these over ad hoc Tailwind classes on new components.

**Images**: `next.config.js` only allows remote images from `images.unsplash.com`; local placeholder product images live in `public/products/`. Add any new remote image host to `images.remotePatterns` before using it.

## Path aliases

`@/*` maps to the project root (see `tsconfig.json`), e.g. `import { getAllProducts } from "@/lib/products"`.
