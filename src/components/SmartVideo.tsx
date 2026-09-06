import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

function isNarrow() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
}

/**
 * Muted looping clip that keeps trying to play on mobile Safari / live CDN.
 * Poster always shows underneath so billboards never look "dead" if video stalls.
 */
export default function SmartVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "160px 0px", once: false, amount: 0 });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;

    const play = () => {
      try {
        el.defaultMuted = true;
        el.muted = true;
        el.playsInline = true;
        el.setAttribute("playsinline", "");
        el.setAttribute("webkit-playsinline", "");
        el.setAttribute("muted", "");
      } catch {
        /* ignore */
      }
      void el.play().catch(() => {});
    };

    if (!inView) {
      // Keep last frame on mobile — hard pause + unload makes billboards look frozen/blank.
      if (!isNarrow()) el.pause();
      return;
    }

    play();
    el.addEventListener("canplay", play);
    el.addEventListener("loadeddata", play);
    el.addEventListener("loadedmetadata", play);

    const onVis = () => {
      if (document.visibilityState === "visible" && inView) play();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", play);

    // One soft unlock after first scroll (not click) — helps iOS without stealing taps.
    const onScroll = () => {
      play();
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });

    const retry = window.setInterval(() => {
      if (el.paused && inView) play();
    }, 2500);

    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("loadeddata", play);
      el.removeEventListener("loadedmetadata", play);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", play);
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(retry);
    };
  }, [inView, src, failed]);

  return (
    <div ref={ref} className={`smart-video ${className}`.trim()}>
      <img src={poster} alt="" loading="lazy" decoding="async" />
      {!failed && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={isNarrow() ? "metadata" : "auto"}
          aria-hidden
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
