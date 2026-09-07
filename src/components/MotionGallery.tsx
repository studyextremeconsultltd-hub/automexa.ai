import { motionClips } from "../data/content";
import { useLiteMedia } from "../hooks/useLiteMedia";
import SmartVideo from "./SmartVideo";
import "./MotionGallery.css";

type Clip = (typeof motionClips)[number];

function Column({
  items,
  direction,
  duration,
  stillsOnly = false,
}: {
  items: Clip[];
  direction: "up" | "down";
  duration: number;
  stillsOnly?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`motion-col motion-col--${direction}`}>
      <div className="motion-col__track" style={{ animationDuration: `${duration}s` }}>
        {doubled.map((item, i) => (
          <figure key={`${item.video}-${i}`} className="motion-card">
            {i < items.length && !stillsOnly ? (
              <SmartVideo src={item.video} poster={item.poster} />
            ) : (
              <img
                src={item.poster}
                alt=""
                loading="lazy"
                decoding="async"
                width={640}
                height={800}
              />
            )}
            <div className="motion-card__glow" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function MotionGallery() {
  const lite = useLiteMedia();
  const left = motionClips.filter((_, i) => i % 2 === 0);
  const right = motionClips.filter((_, i) => i % 2 === 1);
  const mobileLeft = left.slice(0, 3);

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
          {lite ? (
            <Column items={mobileLeft} direction="up" duration={28} stillsOnly />
          ) : (
            <>
              <Column items={left} direction="up" duration={28} />
              <Column items={right} direction="down" duration={34} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
