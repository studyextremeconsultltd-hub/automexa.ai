import { Link } from "react-router-dom";
import { brand } from "../data/content";
import LogoMark, { type LogoMarkVariant } from "./LogoMark";
import "./BrandLogo.css";

type Props = {
  to?: string;
  variant?: "dark" | "light";
  mark?: LogoMarkVariant;
  className?: string;
  onClick?: () => void;
};

export default function BrandLogo({
  to = "/",
  variant = "dark",
  mark = brand.logoMark,
  className = "",
  onClick,
}: Props) {
  const inner = (
    <span className={`brand-logo brand-logo--${variant} ${className}`.trim()}>
      <LogoMark variant={mark} className="brand-logo__mark" />
      <span className="brand-logo__word">
        Auto<span className="brand-logo__accent">Mexa</span>
      </span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="brand-logo-link" onClick={onClick} aria-label="AutoMexa home">
        {inner}
      </Link>
    );
  }

  return inner;
}
