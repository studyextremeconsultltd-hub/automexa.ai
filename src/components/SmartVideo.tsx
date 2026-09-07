import { useEffect, useRef, useState, type RefObject } from "react";
import { useLiteMedia } from "../hooks/useLiteMedia";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

function useNearViewport(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "60px 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return inView;
}

/**
 * Poster-first. On mobile / Save-Data: still image only (no video decode = no scroll hang).
 * Desktop: play when near viewport, pause when off-screen.
 */
export default function SmartVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useNearViewport(ref);
  const [failed, setFailed] = useState(false);
  const lite = useLiteMedia();
  const showVideo = !lite && inView && !failed;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || lite || failed) return;

    if (!inView) {
      el.pause();
      return;
    }

    const play = () => {
      el.defaultMuted = true;
      el.muted = true;
      el.playsInline = true;
      void el.play().catch(() => {});
    };

    play();
    return () => {
      el.pause();
    };
  }, [inView, src, failed, lite]);

  return (
    <div ref={ref} className={`smart-video ${className}`.trim()}>
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        width={720}
        height={480}
      />
      {showVideo && (
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
      )}
    </div>
  );
}
