import { motion } from "framer-motion";
import "./MotionGallery.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83c?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85",
];

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
            <img src={src} alt="" loading="lazy" />
            <div className="motion-card__glow" />
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

export default function MotionGallery() {
  const left = galleryImages.filter((_, i) => i % 2 === 0);
  const right = galleryImages.filter((_, i) => i % 2 === 1);

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
