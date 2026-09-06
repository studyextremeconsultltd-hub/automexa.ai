import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlides, motionClips } from "../data/content";
import SmartVideo from "./SmartVideo";
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

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setPlayVideo(true), 500);
    return () => window.clearTimeout(id);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="hero">
      <div className="hero__visual">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="hero__bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {slide.video && playVideo && (
              <video
                className="hero__bg-video"
                src={slide.video}
                poster={slide.image}
                autoPlay
                muted
                loop
                playsInline
                preload={index === 0 ? "metadata" : "none"}
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
          </motion.div>
        </AnimatePresence>
        <div className="hero__veil" />
        <div className="hero__grain" />

        <div className="hero__stage" aria-hidden>
          {Array.from({ length: 10 }).map((_, i) => {
            const clip = motionClips[i % motionClips.length];
            return (
              <div
                key={i}
                className={`mosaic-tile mosaic-tile--${tileShapes[i]} mosaic-tile--${i + 1}`}
              >
                <SmartVideo
                  src={clip.video}
                  poster={clip.poster}
                  className="mosaic-tile__media"
                />
              </div>
            );
          })}
        </div>

        <div className="hero__caption">
          <div className="container hero__caption-inner">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`t-${slide.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {slide.title}
              </motion.h1>
            </AnimatePresence>

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
