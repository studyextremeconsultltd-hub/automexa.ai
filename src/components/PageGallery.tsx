import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import SmartVideo from "./SmartVideo";
import "./PageGallery.css";

export type GalleryImage = { src: string; video?: string; label: string };

export default function PageGallery({
  title,
  subtitle,
  images,
}: {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
}) {
  return (
    <section className="page-gallery">
      <div className="container">
        <div className="page-gallery__head">
          <p className="section-label">Visual Showcase</p>
          <h2>{title}</h2>
          {subtitle ? <p className="page-gallery__sub">{subtitle}</p> : null}
        </div>
        <div className="page-gallery__grid">
          {images.map((img, i) => (
            <motion.figure
              key={`${img.label}-${i}`}
              className={`page-gallery__card page-gallery__card--${i % 6}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {img.video ? (
                <SmartVideo src={img.video} poster={img.src} />
              ) : (
                <SafeImage src={img.src} alt={img.label} />
              )}
              <figcaption>{img.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
