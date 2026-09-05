import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/** Always mount a muted looping clip and keep trying to play. */
export default function SmartVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "120px 0px", once: false, amount: 0 });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;

    const play = () => {
      el.muted = true;
      el.playsInline = true;
      void el.play().catch(() => {});
    };

    if (!inView) {
      el.pause();
      return;
    }

    play();
    el.addEventListener("canplay", play);
    el.addEventListener("loadeddata", play);
    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("loadeddata", play);
    };
  }, [inView, src, failed]);

  if (failed) {
    return (
      <div ref={ref} className={`smart-video ${className}`.trim()}>
        <img src={poster} alt="" loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`smart-video ${className}`.trim()}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        onError={() => setFailed(true)}
      />
    </div>
  );
}
