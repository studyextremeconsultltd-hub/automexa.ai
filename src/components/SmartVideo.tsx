import { useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lazy, resilient looping video: only mounts the <video> once it approaches
 * the viewport, falls back to the poster image if the stream fails or the
 * visitor prefers reduced motion.
 */
export default function SmartVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "300px 0px", once: true });
  const [failed, setFailed] = useState(false);
  const showVideo = inView && !failed && !prefersReducedMotion;

  return (
    <div ref={ref} className={`smart-video ${className}`.trim()}>
      {showVideo ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onError={() => setFailed(true)}
        />
      ) : (
        <img src={poster} alt="" loading="lazy" decoding="async" />
      )}
    </div>
  );
}
