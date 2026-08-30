import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLiteMedia } from "../hooks/useLiteMedia";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lazy looping video: poster first, <video> only near viewport,
 * paused when off-screen so bandwidth/CPU stay low.
 */
export default function SmartVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "60px 0px", once: false, amount: 0.15 });
  const [failed, setFailed] = useState(false);
  const lite = useLiteMedia();
  const showVideo = inView && !failed && !prefersReducedMotion && !lite;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <div ref={ref} className={`smart-video ${className}`.trim()}>
      {showVideo ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onError={() => setFailed(true)}
        />
      ) : (
        <img src={poster} alt="" loading="lazy" decoding="async" />
      )}
    </div>
  );
}
