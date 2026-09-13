import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site-config";

const SOCIAL_LINKS = [
  { label: "Instagram", href: siteConfig.social.instagram.url, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook.url, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.social.youtube.url, Icon: YouTubeIcon },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-maroon/10 bg-white">
      <div className="container-px grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-maroon-dark/70">
            Tradition Woven with Style. Handmade thread bangles and curated
            women&apos;s ethnic wear, crafted in small batches across India.
          </p>
          <div className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-maroon/20 text-maroon transition-colors hover:bg-maroon hover:text-cream"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-maroon-dark">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-maroon-dark/70">
            <li><Link href="/shop" className="hover:text-maroon">Shop All</Link></li>
            <li><Link href="/shop/clothing" className="hover:text-maroon">Clothing</Link></li>
            <li><Link href="/shop/thread-bangles" className="hover:text-maroon">Thread Bangles</Link></li>
            <li><Link href="/collections" className="hover:text-maroon">Collections</Link></li>
            <li><Link href="/offers" className="hover:text-maroon">Offers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-maroon-dark">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-maroon-dark/70">
            <li><Link href="/about" className="hover:text-maroon">About {siteConfig.name}</Link></li>
            <li><Link href="/contact" className="hover:text-maroon">Contact Us</Link></li>
            <li><Link href="/account" className="hover:text-maroon">My Account</Link></li>
            <li><Link href="/admin" className="hover:text-maroon">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-maroon-dark">Policies</h4>
          <ul className="mt-4 space-y-2 text-sm text-maroon-dark/70">
            <li><Link href="/shipping-policy" className="hover:text-maroon">Shipping Policy</Link></li>
            <li><Link href="/returns-policy" className="hover:text-maroon">Returns &amp; Exchanges</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-maroon">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-maroon">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-maroon-dark">Get in touch</h4>
          <ul className="mt-4 space-y-2 text-sm text-maroon-dark/70">
            <li>WhatsApp: {siteConfig.whatsapp}</li>
            <li>Email: {siteConfig.email}</li>
            <li>{siteConfig.domain}</li>
            <li>Shipping across India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-maroon/10 py-6">
        <div className="container-px flex flex-col items-center justify-between gap-2 text-xs text-maroon-dark/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/shipping-policy" className="hover:text-maroon">Shipping</Link>
            <Link href="/returns-policy" className="hover:text-maroon">Returns</Link>
            <Link href="/privacy-policy" className="hover:text-maroon">Privacy</Link>
            <Link href="/terms" className="hover:text-maroon">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 8.5h2V5.2c-.35-.05-1.53-.15-2.9-.15-2.86 0-4.82 1.75-4.82 4.95V13H6.5v3.6h2.78V22h3.6v-5.4h2.67L16 13h-3.12v-2.6c0-1.05.28-1.9 2.12-1.9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
