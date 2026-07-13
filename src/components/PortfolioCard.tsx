import { useState } from "react";
import { motion } from "framer-motion";
import type { projects } from "../data/content";
import "./PortfolioCard.css";

type Project = (typeof projects)[number];

const stockFallbacks: Record<string, string> = {
  roseempire:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=90&fm=jpg",
  msbt:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=90&fm=jpg",
};

/** Compact horizontal featured card — full-page preview + rotate */
export function FeaturedWorkCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const stock = stockFallbacks[project.id] || stockFallbacks.roseempire;
  const [src, setSrc] = useState(project.screenshot);

  function handleError() {
    setSrc((current) => {
      if (current === project.screenshot && project.screenshotFallback) {
        return project.screenshotFallback;
      }
      return stock;
    });
  }

  return (
    <motion.article
      className={`featured-card featured-card--${project.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="featured-card__orbit">
        <div className="featured-card__device">
          <div className="featured-card__chrome">
            <span />
            <span />
            <span />
            <p>{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</p>
          </div>
          <div className="featured-card__viewport">
            <img
              src={src}
              alt={`${project.name} full website`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={handleError}
            />
          </div>
        </div>
      </div>
      <div className="featured-card__meta">
        <h3>{project.name}</h3>
        <p>
          {project.industry} · {project.country} · {project.completionTime}
        </p>
      </div>
    </motion.article>
  );
}

export default function PortfolioCard({
  project,
  reverse = false,
  compact = false,
}: {
  project: Project;
  reverse?: boolean;
  compact?: boolean;
}) {
  const stock = stockFallbacks[project.id] || stockFallbacks.roseempire;
  const [src, setSrc] = useState(project.screenshot);
  const scrollDir = reverse ? "down" : "up";

  function handleError() {
    setSrc((current) => {
      if (current === project.screenshot && project.screenshotFallback) {
        return project.screenshotFallback;
      }
      return stock;
    });
  }

  return (
    <motion.article
      className={`portfolio-card portfolio-card--${project.id} ${
        reverse ? "portfolio-card--reverse" : ""
      } ${compact ? "portfolio-card--compact" : ""}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
    >
      <div className={`portfolio-card__frame portfolio-card__frame--${project.id}`}>
        <div className="portfolio-card__chrome">
          <span />
          <span />
          <span />
          <p>{project.url.replace(/^https?:\/\//, "")}</p>
          <em>Full page preview</em>
        </div>
        <div className="portfolio-card__media">
          <div className={`portfolio-card__scroll portfolio-card__scroll--${scrollDir}`}>
            <img
              src={src}
              alt={`${project.name} complete website view`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={handleError}
            />
            <img
              src={src}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={handleError}
            />
          </div>
          <div className="portfolio-card__shine" />
          <div className="portfolio-card__badge">Complete site scroll</div>
        </div>
      </div>

      <div className="portfolio-card__body">
        <p className="section-label">Featured Project</p>
        <h3>{project.name}</h3>
        <dl className="portfolio-meta">
          <div>
            <dt>Industry</dt>
            <dd>{project.industry}</dd>
          </div>
          <div>
            <dt>Country</dt>
            <dd>{project.country}</dd>
          </div>
          <div>
            <dt>Technology</dt>
            <dd>{project.technology}</dd>
          </div>
          <div>
            <dt>Completion Time</dt>
            <dd>{project.completionTime}</dd>
          </div>
        </dl>
        {!compact && (
          <>
            <p className="portfolio-card__desc">{project.description}</p>
          </>
        )}
      </div>
    </motion.article>
  );
}
