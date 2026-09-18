import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center ${className}`}>
      <Image
        src="/brand/logo.png"
        alt={siteConfig.name}
        width={1400}
        height={420}
        className="h-8 w-auto object-contain sm:h-10 md:h-12 lg:h-14"
        priority={priority}
      />
    </Link>
  );
}
