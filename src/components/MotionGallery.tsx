import { motion } from "framer-motion";
import { mosaicPool } from "../data/content";
import SafeImage from "./SafeImage";
import "./MotionGallery.css";

function Column({
  images,
  direction,
  duration,
}: {
  images: string[];
  direction: "up" | "down";
  duration: number;
}) {
  const doubled = [...images, ...images];
  return (
    <div className={`motion-col motion-col--${direction}`}>
      <div className="motion-col__track" style={{ animationDuration: `${duration}s` }}>
        {doubled.map((src, i) => (
          <motion.figure
            key={`${src}-${i}`}
            className="motion-card"
            whileHover={{ scale: 1.03 }}
          >
            <SafeImage src={src} alt="" />
            <div className="motion-card__glow" />
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

export default function MotionGallery() {
  const left = mosaicPool.filter((_, i) => i % 2 === 0);
  const right = mosaicPool.filter((_, i) => i % 2 === 1);

  return (
    <section className="motion-gallery">
      <div className="motion-gallery__veil" />
      <div className="container motion-gallery__layout">
        <div className="motion-gallery__copy">
          <p className="section-label">Cinematic Craft</p>
          <h2 className="section-title">Motion that makes your brand feel alive</h2>
          <p className="section-lead">
            Every Automexa site is built to feel premium, dynamic, and impossible to ignore —
            so visitors want to order on first sight.
          </p>
          <div className="motion-gallery__chips">
            <span>Smooth scroll reveals</span>
            <span>Living imagery</span>
            <span>Conversion-first design</span>
          </div>
        </div>
        <div className="motion-gallery__stage" aria-hidden>
          <Column images={left} direction="up" duration={28} />
          <Column images={right} direction="down" duration={34} />
        </div>
      </div>
    </section>
  );
}
