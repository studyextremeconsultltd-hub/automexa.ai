import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { heroSlides } from "../data/content";
import { useQuote } from "../context/QuoteContext";
import "./HeroSlider.css";

/** 10 HD images — mosaic tiles cycle like Luma's living visual stage */
const mosaicPool = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85",
];

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
  const { openQuote } = useQuote();
  const [index, setIndex] = useState(0);
  const [mosaicTick, setMosaicTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMosaicTick((t) => t + 1);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroSlides[index];

  function tileSrc(i: number) {
    return mosaicPool[(i + mosaicTick) % mosaicPool.length];
  }

  return (
    <section className="hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="hero__bg"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>
      <div className="hero__veil" />
      <div className="hero__grain" />

      <div className="container hero__content">
        <div className="hero__copy">
          <motion.p className="hero__brand" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            Auto<span>mexa</span>
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`t-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`s-${slide.id}`}
              className="hero__sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div className="hero__actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <button type="button" className="btn btn-primary" onClick={openQuote}>
              <Sparkles size={18} />
              Get Free Quote
            </button>
            <a href="#work" className="btn btn-outline">
              See Our Work
              <ArrowRight size={16} />
            </a>
          </motion.div>

          <div className="hero__controls">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="hero__dots">
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
            <button
              type="button"
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % heroSlides.length)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <motion.div
          className="hero__mosaic"
          aria-hidden
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`mosaic-tile mosaic-tile--${tileShapes[i]} mosaic-tile--${i + 1}`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={tileSrc(i)}
                  src={tileSrc(i)}
                  alt=""
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                />
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
