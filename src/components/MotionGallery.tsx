import { motion } from "framer-motion";
import { motionClips } from "../data/content";
import SmartVideo from "./SmartVideo";
import "./MotionGallery.css";

type Clip = (typeof motionClips)[number];

function Column({
  items,
  direction,
  duration,
}: {
  items: Clip[];
  direction: "up" | "down";
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`motion-col motion-col--${direction}`}>
      <div className="motion-col__track" style={{ animationDuration: `${duration}s` }}>
        {doubled.map((item, i) => (
          <motion.figure
            key={`${item.video}-${i}`}
            className="motion-card"
            whileHover={{ scale: 1.03 }}
          >
            <SmartVideo src={item.video} poster={item.poster} />
            <div className="motion-card__glow" />
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

export default function MotionGallery() {
  const left = motionClips.filter((_, i) => i % 2 === 0);
  const right = motionClips.filter((_, i) => i % 2 === 1);

  return (
    <section className="motion-gallery">
      <div className="motion-gallery__veil" />
      <div className="container motion-gallery__layout">
        <div className="motion-gallery__copy">
          <p className="section-label">Cinematic Craft</p>
          <h2 className="section-title">Motion that makes your brand feel alive</h2>
          <p className="section-lead">
            Every AutoMexa site is built to feel premium, dynamic, and impossible to ignore —
            so visitors want to order on first sight.
          </p>
          <div className="motion-gallery__chips">
            <span>Smooth scroll reveals</span>
            <span>Living imagery</span>
            <span>Conversion-first design</span>
          </div>
        </div>
        <div className="motion-gallery__stage" aria-hidden>
          <Column items={left} direction="up" duration={28} />
          <Column items={right} direction="down" duration={34} />
        </div>
      </div>
    </section>
  );
}
