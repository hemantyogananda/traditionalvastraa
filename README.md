# Traditional Vastraa — E-Commerce Website

A modern, responsive e-commerce storefront for **Traditional Vastraa** (traditionalvastraa.com), built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. This project uses **mock data** so it works immediately, and is structured to make it easy to connect a real database, authentication, and payment gateway later.

> Tagline: *Tradition Woven with Style* — Brand message: *More than just fashion… it's a feeling!*

---

## 1. Tech Stack

- **Next.js 14** with the App Router (`/app` directory)
- **TypeScript** throughout
- **Tailwind CSS** for styling, with a custom brand theme (maroon, gold, blush pink, cream, sage)
- **React Context** (no external state library) for cart and wishlist state, persisted to `localStorage`
- **Mock data** in `/lib` — no backend or database required to run the site

This is a **frontend + UI scaffold**. Cart/wishlist work fully in the browser. Checkout, the admin dashboard, and account pages simulate real behavior with in-memory/mock data — see Section 6 for how to wire up a real backend.

---

## 2. Project Structure

```
nagajothi-store/
├── app/                          # Next.js App Router — every folder here is a route
│   ├── layout.tsx                # Root layout: announcement bar, navbar, footer, providers
│   ├── globals.css               # Tailwind + global styles + brand fonts
│   ├── page.tsx                  # Home page ("/")
│   ├── shop/
│   │   ├── page.tsx              # All products ("/shop")
│   │   ├── clothing/page.tsx     # Clothing only ("/shop/clothing")
│   │   └── thread-bangles/page.tsx
│   ├── product/[slug]/page.tsx   # Dynamic product detail page
│   ├── collections/page.tsx
│   ├── offers/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── cart/page.tsx
│   ├── wishlist/page.tsx
│   ├── checkout/page.tsx
│   ├── order-success/page.tsx
│   ├── account/page.tsx
│   └── admin/page.tsx            # Admin dashboard ("/admin")
│
├── components/                   # Reusable UI components
│   ├── Navbar.tsx, Footer.tsx, AnnouncementBar.tsx, Logo.tsx
│   ├── Hero.tsx, CategoryRail.tsx, ProductCard.tsx, ProductGrid.tsx, ProductRail.tsx
│   ├── BangleStylingSection.tsx, FestivalBanner.tsx, ReviewsSection.tsx
│   ├── InstagramGallery.tsx, NewsletterSection.tsx, SectionHeader.tsx, StarRating.tsx
│   ├── ShopPageContent.tsx       # Shared filter/sort/search logic for all shop pages
│   ├── ProductDetailClient.tsx   # Interactive part of the product page
│   └── admin/AdminDashboard.tsx  # Tabs: Overview, Products, Orders, Enquiries
│
├── context/
│   ├── CartContext.tsx           # Cart state, persisted to localStorage
│   └── WishlistContext.tsx       # Wishlist state, persisted to localStorage
│
├── lib/
│   ├── types.ts                  # TypeScript types: Product, Order, Enquiry, etc.
│   ├── products.ts                # Mock product data + helper functions (getAllProducts, etc.)
│   ├── admin-data.ts             # Mock orders + customer enquiries for the admin dashboard
│   └── utils.ts                  # formatPrice, discountPercent, generateOrderId, etc.
│
├── public/
│   ├── products/                 # Placeholder product images (brand-colored, generated locally)
│   └── brand/                    # Logo files
│
├── tailwind.config.ts            # Brand colors, fonts, animations
├── next.config.js
├── tsconfig.json
└── package.json
```

**How routing works:** in the App Router, a folder under `/app` becomes a URL path, and a `page.tsx` inside it is what renders for that path. `product/[slug]/page.tsx` is a **dynamic route** — `[slug]` becomes a URL parameter, so `/product/maroon-gold-thread-bangle-set` renders that file with `params.slug` set accordingly.

**Server vs. Client components:** by default every component in `/app` is a Server Component (rendered on the server, no JavaScript shipped for it). Any component that needs interactivity (`useState`, `onClick`, browser APIs) is marked `"use client"` at the top of the file — for example `ProductDetailClient.tsx`, `Navbar.tsx`, and everything in `context/`. Pages that need both (like the product page, which needs SEO metadata from the server *and* an interactive add-to-cart button) split the work: `app/product/[slug]/page.tsx` stays a Server Component and renders the client component `ProductDetailClient` inside it.

---

## 3. Setup Instructions

You'll need [Node.js](https://nodejs.org) 18.17 or later installed.

```bash
# 1. Move into the project folder
cd nagajothi-store

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The site reloads automatically as you edit files.

**Note:** this project's dependencies were written for you but not pre-installed (the environment this was built in doesn't have internet access to npm). Running `npm install` the first time on your own machine will download Next.js, React, and Tailwind — this is normal and only needs to happen once.

---

## 4. How Key Components Work

- **`CartContext.tsx` / `WishlistContext.tsx`** — wrap the whole app (in `layout.tsx`) so any component can call `useCart()` or `useWishlist()` to read or update cart/wishlist state from anywhere, without passing props down manually. State is saved to `localStorage` so it survives a page refresh.
- **`ProductCard.tsx`** — the product tile used everywhere (home page, shop grids, related products). Handles its own "quick add to cart" and wishlist heart button.
- **`ShopPageContent.tsx`** — powers `/shop`, `/shop/clothing`, and `/shop/thread-bangles`. It reads the URL's search params (like `?search=saree` or `?type=kurtis`) and filters the mock product list client-side. In a real backend, this filtering would become an API call instead.
- **`lib/products.ts`** — this is your **single source of truth for product data** right now. To add a real product, add an entry to the `products` array here (see Section 6 for moving this to a real database instead).
- **`admin/AdminDashboard.tsx`** — a fully working *UI* for managing products, orders, and enquiries, but all changes live only in the browser's memory and **reset on page refresh**. This is intentional for a demo — see Section 6 to make it persistent.

---

## 5. Sample Product Data

Products live in `lib/products.ts` as a typed array (see `lib/types.ts` for the `Product` interface). Each product includes images, pricing, stock, category-specific fields (fabric/fit for clothing, bangle size/count/material for thread bangles), and reviews. To add a new product, copy an existing object in the array and change its fields — make sure `slug` is unique, since that's what the product detail page URL uses.

---

## 6. Connecting a Real Backend Later

This project is intentionally backend-free so it runs immediately. When you're ready to go live, here's the recommended path:

1. **Database:** add [Prisma](https://www.prisma.io/) with a Postgres database (e.g. via [Supabase](https://supabase.com) or [Neon](https://neon.tech), both have free tiers), or use [Supabase](https://supabase.com)'s client directly. Define a `Product`, `Order`, and `Enquiry` model matching the shapes in `lib/types.ts`.
2. **API routes:** create files under `app/api/products/route.ts`, `app/api/orders/route.ts`, etc. — Next.js API routes run on the server and can talk to your database. Replace calls to `getAllProducts()` etc. with `fetch("/api/products")`.
3. **Admin dashboard:** point the Add/Edit/Delete actions in `AdminDashboard.tsx` at your new API routes (`POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`) instead of local `setState`.
4. **Authentication:** add [NextAuth.js](https://next-auth.js.org/) (or [Clerk](https://clerk.com)) for real customer login and an admin-only guard on `/admin`.
5. **Payments:** integrate [Razorpay](https://razorpay.com/docs/) or [Cashfree](https://www.cashfree.com/) — both are built for Indian businesses and support UPI. Their checkout SDK replaces the "Place Order" button's current mock behavior in `app/checkout/page.tsx`.
6. **Images:** replace the placeholder images in `public/products/` with real photography, or move to a media host (Cloudinary, Vercel Blob, or an S3 bucket) and update `next.config.js`'s `images.remotePatterns` accordingly.

---

## 7. Deployment

The easiest path is [Vercel](https://vercel.com) (made by the creators of Next.js):

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no configuration needed. Click Deploy.
4. Once real backend services (database, payments) are added, add their API keys under Vercel's **Environment Variables** settings.

Other good options: Netlify, Railway, or a Node server on any VPS (`npm run build && npm run start`).

---

## 8. Future Improvements

- Real database + authentication (see Section 6)
- Real payment gateway integration (UPI/cards via Razorpay or Cashfree)
- Order tracking with courier API integration (Shiprocket, Delhivery)
- Product search with a dedicated search index (e.g. Algolia) once the catalog grows
- Customer accounts with real order history, saved addresses, and re-order functionality
- Image optimization pipeline (replace placeholder images with a CDN like Cloudinary)
- Automated emails/SMS/WhatsApp order confirmations (e.g. via Twilio or the WhatsApp Business API)
- Analytics (Google Analytics or Plausible) to track which products and pages convert best
- Multi-language support (Tamil/Hindi) if you expand beyond English-speaking customers
- Automated testing (Jest/Playwright) as the codebase grows

---

## 9. Design Notes

The theme lives in `tailwind.config.ts` under `theme.extend.colors` (maroon, gold, blush, cream, sage) and `theme.extend.fontFamily` (Playfair Display for headings, Poppins for body text) — matching the brand identity in the companion brand guide. Reusable style classes (`.btn-primary`, `.btn-secondary`, `.btn-gold`, `.card`, `.section-title`, `.input-field`) are defined once in `app/globals.css` under `@layer components`, so the whole site's look can be adjusted from a couple of places rather than hunting through every component.
