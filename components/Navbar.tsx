"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const OCCASION_LINKS = [
  { href: "/shop?occasion=wedding", label: "Weddings" },
  { href: "/shop?occasion=festival", label: "Festivals" },
  { href: "/shop?occasion=daily", label: "Daily Wear" },
  { href: "/shop?occasion=office", label: "Office Wear" },
  { href: "/shop?occasion=gifting", label: "Gifting" },
];

const FABRIC_LINKS = [
  { href: "/shop?fabric=silk", label: "Silk" },
  { href: "/shop?fabric=cotton", label: "Cotton" },
  { href: "/shop?fabric=cotton-silk", label: "Cotton-Silk Blend" },
];

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/shop?arrivals=new", label: "New Arrivals" },
  { href: "/shop/clothing?type=sarees", label: "Sarees" },
  { href: "/shop/clothing?type=kurtis", label: "Kurtis" },
  { href: "/shop/thread-bangles", label: "Thread Bangles" },
  { href: "/shop", label: "Shop by Occasion", children: OCCASION_LINKS },
  { href: "/shop", label: "Shop by Fabric", children: FABRIC_LINKS },
  { href: "/offers", label: "Offers" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-maroon/10 bg-cream/95 backdrop-blur">
      <div className="container-px flex h-16 items-center justify-between gap-4 sm:h-20">
        <button
          className="flex flex-col gap-1.5 p-1 xl:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="h-0.5 w-6 bg-maroon-dark" />
          <span className="h-0.5 w-6 bg-maroon-dark" />
          <span className="h-0.5 w-6 bg-maroon-dark" />
        </button>

        <Logo priority />

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-maroon-dark/80 transition-colors hover:text-maroon"
                >
                  {link.label}
                  <ChevronIcon />
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-2 rounded-xl2 border border-maroon/10 bg-white p-2 opacity-0 shadow-cardHover transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.href + child.label}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-maroon-dark/80 transition-colors hover:bg-blush-light hover:text-maroon"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-maroon-dark/80 transition-colors hover:text-maroon"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((o) => !o)}
            className="text-maroon-dark transition-colors hover:text-gold"
          >
            <SearchIcon />
          </button>
          <Link href={user ? "/account" : "/login"} aria-label="Account" className="text-maroon-dark transition-colors hover:text-gold">
            <UserIcon />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="relative text-maroon-dark transition-colors hover:text-gold">
            <HeartIcon />
            {wishlist.length > 0 && <CountBadge count={wishlist.length} />}
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative text-maroon-dark transition-colors hover:text-gold">
            <BagIcon />
            {totalItems > 0 && <CountBadge count={totalItems} />}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-maroon/10 bg-cream">
          <form onSubmit={handleSearchSubmit} className="container-px flex items-center gap-2 py-3">
            <input
              autoFocus
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search sarees, kurtis, thread bangles..."
              className="input-field"
            />
            <button type="submit" className="btn-primary shrink-0">
              Search
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="border-t border-maroon/10 bg-cream xl:hidden">
          <div className="container-px flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-maroon/5 py-3">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-maroon-dark"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mt-2 flex flex-col gap-2 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-xs text-maroon-dark/70"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-maroon-dark">
      {count}
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="mt-0.5 transition-transform group-hover:rotate-180">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.7 6.4 3.2C14.6 4.7 16.4 3.7 18.4 4c3.6.5 5.1 4 3.6 7.7C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
