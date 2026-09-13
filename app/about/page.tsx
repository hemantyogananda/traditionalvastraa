import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: `About ${siteConfig.name}` };

export default function AboutPage() {
  return (
    <div className="container-px py-14">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-card">
          <Image src="/brand/photos/fabric-stack.jpg" alt={`${siteConfig.name} studio`} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Our Story</p>
          <h1 className="section-title mt-1 text-left">More Than Just Fashion… It&apos;s a Feeling!</h1>
          <p className="mt-5 text-sm leading-relaxed text-maroon-dark/75">
            {siteConfig.name} began with a simple belief — that &ldquo;vastra&rdquo; (clothing) is never just
            fabric. It carries the warmth of a festival morning at home, the comfort of something your grandmother
            would recognize, and the pride of a craft passed down by hand. That&apos;s the spirit behind every
            piece: each saree, kurti, and hand-knotted thread bangle is chosen or made to bring a little glow to
            the woman wearing it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-maroon-dark/75">
            We work with home-based artisans and small weaving units across India, so every order supports real
            hands and real families — not a factory line. {siteConfig.name} is for the woman who loves her roots
            but dresses for today: comfortable in cotton and silk, happy to pair a modern kurti with bangles her
            grandmother would recognize.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { title: "Handmade, Always", desc: "Every thread bangle is hand-knotted in small batches — no two are exactly alike." },
          { title: "Rooted in Tradition", desc: "Designs that honor Indian craftsmanship while fitting comfortably into modern life." },
          { title: "Made Personal", desc: "A real person replies to every message — we believe fashion should feel personal." },
        ].map((v) => (
          <div key={v.title} className="card p-6 text-center">
            <h3 className="font-serif text-lg font-semibold text-maroon-dark">{v.title}</h3>
            <p className="mt-2 text-sm text-maroon-dark/70">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
