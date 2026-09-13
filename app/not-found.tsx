import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-px flex flex-col items-center py-24 text-center">
      <h1 className="font-serif text-4xl font-semibold text-maroon-dark">404</h1>
      <p className="section-subtitle">We couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}
