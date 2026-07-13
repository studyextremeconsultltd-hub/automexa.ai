import { useState, type CSSProperties } from "react";

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#0B3A6E"/>
          <stop offset="1" stop-color="#2563EB"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <circle cx="900" cy="180" r="160" fill="#60A5FA" opacity=".25"/>
      <circle cx="220" cy="620" r="200" fill="#93C5FD" opacity=".2"/>
    </svg>`,
  );

type Props = {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  loading?: "lazy" | "eager";
  style?: CSSProperties;
};

export default function SafeImage({
  src,
  alt,
  fallback,
  className,
  loading = "lazy",
  style,
}: Props) {
  const [current, setCurrent] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      style={style}
      onError={() => {
        if (!triedFallback && fallback && fallback !== current) {
          setTriedFallback(true);
          setCurrent(fallback);
          return;
        }
        if (current !== PLACEHOLDER) setCurrent(PLACEHOLDER);
      }}
    />
  );
}
