import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { projects } from "../data/content";
import "./PortfolioCard.css";

type Project = (typeof projects)[number];

const fallbacks: Record<string, string> = {
  roseempire:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=85",
  msbt:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=85",
};

export default function PortfolioCard({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const [src, setSrc] = useState(project.screenshot);
  const scrollDir = reverse ? "down" : "up";

  return (
    <motion.article
      className={`portfolio-card portfolio-card--${project.id} ${
        reverse ? "portfolio-card--reverse" : ""
      }`}
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
              onError={() => setSrc(fallbacks[project.id] || fallbacks.roseempire)}
            />
            <img
              src={src}
              alt=""
              aria-hidden
              loading="lazy"
              onError={() => setSrc(fallbacks[project.id] || fallbacks.roseempire)}
            />
          </div>
          <div className="portfolio-card__shine" />
          <div className="portfolio-card__badge">Complete site scroll</div>
        </div>
      </div>

      <div className="portfolio-card__body">
        <p className="section-label section-label--catchy">Featured Project</p>
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
        <p className="portfolio-card__desc">{project.description}</p>
        <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-live">
          Live Website
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.article>
  );
}
