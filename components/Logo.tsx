import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt={siteConfig.name}
        width={56}
        height={56}
        className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
        priority={priority}
      />
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
