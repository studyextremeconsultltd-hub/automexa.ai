import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import "./HighlightSlider.css";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85",
    kicker: "AI Website Design",
    title: "From prompt to polished pages — AI accelerates every layout.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=85",
    kicker: "Smart Automation",
    title: "Design systems that look premium and convert on every device.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",
    kicker: "Growth Ready",
    title: "Launch faster with AI-assisted builds built for real businesses.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85",
    kicker: "Contact Us",
    title: "Ready to start? Contact us and get your free quote today.",
    cta: true,
  },
];

export default function HighlightSlider() {
  const { openQuote } = useQuote();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="highlight-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="highlight-slider__bg"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>
      <div className="highlight-slider__veil" />

      <div className="container highlight-slider__inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${slide.id}`}
            className="highlight-slider__copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <p className="highlight-slider__kicker">{slide.kicker}</p>
            <h2>{slide.title}</h2>
            {slide.cta && (
              <div className="highlight-slider__actions">
                <Link to="/contact" className="btn btn-ink">
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
                <button type="button" className="btn btn-primary" onClick={openQuote}>
                  <Sparkles size={16} />
                  Get Free Quote
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="highlight-slider__dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={`Highlight slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
