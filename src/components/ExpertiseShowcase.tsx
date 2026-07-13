import { motion } from "framer-motion";
import {
  Bot,
  Plug,
  LayoutTemplate,
  Database,
  ShieldCheck,
  Rocket,
  Check,
} from "lucide-react";
import { expertiseAreas, integrations, stats } from "../data/content";
import "./ExpertiseShowcase.css";

const iconMap = {
  bot: Bot,
  plug: Plug,
  layout: LayoutTemplate,
  database: Database,
  shield: ShieldCheck,
  rocket: Rocket,
} as const;

export default function ExpertiseShowcase() {
  const marqueeItems = [...integrations, ...integrations];

  return (
    <>
      <section className="section expertise-section" id="expertise">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">Our Expertise</p>
            <h2 className="section-title" style={{ maxWidth: "24ch", marginInline: "auto" }}>
              Masters of AI Automation, Integration & Web Design
            </h2>
            <p className="section-lead" style={{ marginInline: "auto" }}>
              Businesses worldwide trust AutoMexa to design their websites, build their
              CRM apps, and automate their operations with AI — end to end, security
              included.
            </p>
          </div>

          <div className="expertise-grid">
            {expertiseAreas.map((area, i) => {
              const Icon = iconMap[area.icon as keyof typeof iconMap] ?? Bot;
              return (
                <motion.article
                  key={area.title}
                  className="expertise-card"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
                >
                  <span className="expertise-card__icon">
                    <Icon size={26} />
                  </span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                  <ul>
                    {area.points.map((point) => (
                      <li key={point}>
                        <Check size={15} aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="AutoMexa in numbers">
        <div className="container stats-band__inner">
          {stats.map((s) => (
            <div className="stats-band__item" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="integrations-band" aria-label="Platforms we integrate">
        <div className="container">
          <p className="section-label center" style={{ textAlign: "center" }}>
            We Integrate With
          </p>
        </div>
        <div className="integrations-rail">
          <div className="integrations-rail__track">
            {marqueeItems.map((name, i) => (
              <span className="integration-chip" key={`${name}-${i}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
