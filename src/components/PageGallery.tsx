import SafeImage from "./SafeImage";
import SmartVideo from "./SmartVideo";
import { useLiteMedia } from "../hooks/useLiteMedia";
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
  const lite = useLiteMedia();
  const visible = lite ? images.slice(0, 3) : images;

  return (
    <section className="page-gallery cv-auto">
      <div className="container">
        <div className="page-gallery__head">
          <p className="section-label">Visual Showcase</p>
          <h2>{title}</h2>
          {subtitle ? <p className="page-gallery__sub">{subtitle}</p> : null}
        </div>
        <div className="page-gallery__grid">
          {visible.map((img, i) => (
            <figure
              key={`${img.label}-${i}`}
              className={`page-gallery__card page-gallery__card--${i % 6}`}
            >
              {img.video ? (
                <SmartVideo src={img.video} poster={img.src} />
              ) : (
                <SafeImage src={img.src} alt={img.label} />
              )}
              <figcaption>{img.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
