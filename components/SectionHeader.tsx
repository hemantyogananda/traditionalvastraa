import { siteConfig } from "@/lib/site-config";

export default function SectionHeader({
  title,
  subtitle,
  center = true,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">{siteConfig.name}</p>
      <h2 className="section-title mt-1">{title}</h2>
      {subtitle && <p className={`section-subtitle ${center ? "mx-auto max-w-xl" : ""}`}>{subtitle}</p>}
    </div>
  );
}
