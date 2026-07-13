import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlides, mosaicPool } from "../data/content";
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

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [mosaicTick, setMosaicTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMosaicTick((t) => t + 1);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroSlides[index];

  function tileSrc(i: number) {
    return mosaicPool[(i + mosaicTick) % mosaicPool.length];
  }

  return (
    <section className="hero">
      <div className="hero__visual">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="hero__bg"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </AnimatePresence>
        <div className="hero__veil" />
        <div className="hero__grain" />

        <div className="hero__stage" aria-hidden>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`mosaic-tile mosaic-tile--${tileShapes[i]} mosaic-tile--${i + 1}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tileSrc(i)}
                  className="mosaic-tile__media"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65 }}
                >
                  <SafeImage src={tileSrc(i)} alt="" loading="eager" />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
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

      <div className="hero__below">
        <div className="container hero__below-inner">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`t-${slide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
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
    </section>
  );
}
