import { motion } from "framer-motion";
import "./PageGallery.css";

export const showcaseImages = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85",
    label: "AI Build",
  },
  {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85",
    label: "Design Systems",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85",
    label: "Team Craft",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
    label: "Growth Analytics",
  },
  {
    src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83c?auto=format&fit=crop&w=1000&q=85",
    label: "UI Polish",
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85",
    label: "E-commerce",
  },
];

export default function PageGallery({
  title = "Visual craft across every page",
}: {
  title?: string;
}) {
  return (
    <section className="page-gallery">
      <div className="container">
        <div className="page-gallery__head">
          <p className="section-label section-label--catchy">Visual Showcase</p>
          <h2>{title}</h2>
        </div>
        <div className="page-gallery__grid">
          {showcaseImages.map((img, i) => (
            <motion.figure
              key={img.src}
              className={`page-gallery__card page-gallery__card--${i % 6}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <img src={img.src} alt={img.label} loading="lazy" />
              <figcaption>{img.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
