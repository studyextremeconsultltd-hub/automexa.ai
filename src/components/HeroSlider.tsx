import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { heroSlides, mosaicPool } from "../data/content";
import { useLiteMedia } from "../hooks/useLiteMedia";
import SafeImage from "./SafeImage";
import "./HeroSlider.css";

const tileShapes = [
  "tall",
  "wide",
  "square",
  "tall",
  "square",
  "wide",
  "square",
  "tall",
  "wide",
  "square",
] as const;

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroSlider() {
  const lite = useLiteMedia();
  const [index, setIndex] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [readyToRotate, setReadyToRotate] = useState(false);

  // Delay slide rotation so LCP stays stable (helps CLS + LCP)
  useEffect(() => {
    const warm = window.setTimeout(() => setReadyToRotate(true), lite ? 12000 : 8000);
    return () => window.clearTimeout(warm);
  }, [lite]);

  useEffect(() => {
    if (!readyToRotate) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, lite ? 10000 : 8000);
    return () => window.clearInterval(id);
  }, [readyToRotate, lite]);

  useEffect(() => {
    if (lite) return;
    const id = window.setTimeout(() => setPlayVideo(true), 2500);
    return () => window.clearTimeout(id);
  }, [lite]);

  const slide = heroSlides[index];

  return (
    <section className="hero">
      <div className="hero__visual">
        <div className="hero__bg" key={slide.id}>
          <img
            className="hero__bg-img"
            src={slide.image}
            alt=""
            width={1280}
            height={853}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding={index === 0 ? "sync" : "async"}
            sizes="100vw"
          />
          {slide.video && playVideo && !lite && !prefersReducedMotion && (
            <video
              className="hero__bg-video"
              src={slide.video}
              poster={slide.image}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              onCanPlay={(e) => {
                const v = e.currentTarget;
                v.defaultMuted = true;
                v.muted = true;
                v.setAttribute("playsinline", "");
                v.setAttribute("webkit-playsinline", "");
                void v.play().catch(() => {});
              }}
            />
          )}
        </div>
        <div className="hero__veil" />
        <div className="hero__grain" />

        {!lite && (
          <div className="hero__stage" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`mosaic-tile mosaic-tile--${tileShapes[i]} mosaic-tile--${i + 1}`}
              >
                <SafeImage
                  src={mosaicPool[i % mosaicPool.length]}
                  alt=""
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <div className="hero__caption">
          <div className="container hero__caption-inner">
            <h1>{slide.title}</h1>
            <a href="#work" className="btn btn-primary hero__work-btn">
              See Our Work
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="hero__dots hero__dots--overlay">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
