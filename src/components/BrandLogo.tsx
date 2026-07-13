import { Link } from "react-router-dom";
import "./BrandLogo.css";

type Props = {
  to?: string;
  variant?: "dark" | "light";
  className?: string;
  onClick?: () => void;
};

export default function BrandLogo({
  to = "/",
  variant = "dark",
  className = "",
  onClick,
}: Props) {
  const inner = (
    <span className={`brand-logo brand-logo--${variant} ${className}`.trim()}>
      <img
        className="brand-logo__mark"
        src="/logo-mark.png"
        alt=""
        width={40}
        height={40}
        decoding="async"
      />
      <span className="brand-logo__word">
        Auto<span>mexa</span>
      </span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="brand-logo-link" onClick={onClick} aria-label="Automexa home">
        {inner}
      </Link>
    );
  }

  return inner;
}
