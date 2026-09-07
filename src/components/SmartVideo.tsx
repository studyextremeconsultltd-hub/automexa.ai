import { useEffect, useRef, useState, type RefObject } from "react";
import { useLiteMedia } from "../hooks/useLiteMedia";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

function isNarrow() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
}

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
      { rootMargin: "80px 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return inView;
}

/**
 * Poster-first video: on phones / Save-Data we keep stills only for PageSpeed.
 * Desktop retries play for Safari/CDN reliability.
 */
export default function SmartVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useNearViewport(ref);
  const [failed, setFailed] = useState(false);
  const lite = useLiteMedia();
  const showVideo = inView && !failed && !lite;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed || lite) return;

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
