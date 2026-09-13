export default function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {stars.map((s) => {
        const fillPercent = Math.max(0, Math.min(1, rating - (s - 1))) * 100;
        return (
          <span key={s} className="relative inline-block" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 24 24" className="absolute inset-0 text-maroon/15" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
              <svg width={size} height={size} viewBox="0 0 24 24" className="text-gold" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
