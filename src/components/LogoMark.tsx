import "./LogoMark.css";

export type LogoMarkVariant = "signature" | "pulse" | "hex" | "orbit";

type Props = {
  variant?: LogoMarkVariant;
  className?: string;
};

export default function LogoMark({ variant = "signature", className = "" }: Props) {
  return (
    <span className={`logo-mark logo-mark--${variant} ${className}`.trim()} aria-hidden>
      {variant === "signature" && <SignatureMark />}
      {variant === "pulse" && <PulseMark />}
      {variant === "hex" && <HexMark />}
      {variant === "orbit" && <OrbitMark />}
    </span>
  );
}

/**
 * Signature AutoMexa mark — "Living Circuit A".
 * A delta monogram traced by a travelling comet of light, wrapped in a
 * counter-rotating energy halo with pulsing circuit nodes. Pure SVG + CSS.
 */
function SignatureMark() {
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sig-flow" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A">
            <animate
              attributeName="stop-color"
              values="#FDE68A;#F59E0B;#FBBF24;#FDE68A"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="0.5" stopColor="#FBBF24">
            <animate
              attributeName="stop-color"
              values="#FBBF24;#FDE68A;#F59E0B;#FBBF24"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1" stopColor="#F59E0B">
            <animate
              attributeName="stop-color"
              values="#F59E0B;#FBBF24;#FDE68A;#F59E0B"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <filter id="sig-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Counter-rotating energy halo */}
      <circle
        className="sig-halo sig-halo--outer"
        cx="36"
        cy="36"
        r="32"
        stroke="url(#sig-flow)"
        strokeWidth="1.4"
        strokeDasharray="10 14 44 14 10 108"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle
        className="sig-halo sig-halo--inner"
        cx="36"
        cy="36"
        r="27"
        stroke="#FCD34D"
        strokeWidth="0.8"
        strokeDasharray="2 10"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Delta monogram — dim base track */}
      <path
        className="sig-track"
        d="M36 13 L57 53 H15 Z"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.32"
      />
      {/* Crossbar track */}
      <path className="sig-track" d="M26.5 41.5 H45.5" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" opacity="0.32" />

      {/* Comet of light racing around the monogram */}
      <path
        className="sig-comet"
        d="M36 13 L57 53 H15 Z"
        stroke="url(#sig-flow)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#sig-glow)"
      />
      {/* Crossbar shimmer */}
      <path
        className="sig-crossbar"
        d="M26.5 41.5 H45.5"
        stroke="url(#sig-flow)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#sig-glow)"
      />

      {/* Circuit nodes at the vertices */}
      <circle className="sig-node sig-node--1" cx="36" cy="13" r="3" fill="#FEF3C7" filter="url(#sig-glow)" />
      <circle className="sig-node sig-node--2" cx="57" cy="53" r="3" fill="#FCD34D" filter="url(#sig-glow)" />
      <circle className="sig-node sig-node--3" cx="15" cy="53" r="3" fill="#FDE68A" filter="url(#sig-glow)" />

      {/* Reactor core */}
      <circle className="sig-core" cx="36" cy="41.5" r="2.2" fill="#FFFFFF" filter="url(#sig-glow)" />
    </svg>
  );
}

function PulseMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pulse-g" x1="8" y1="8" x2="40" y2="40">
          <stop stopColor="#93C5FD" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <radialGradient id="pulse-core" cx="50%" cy="50%" r="50%">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#60A5FA" />
        </radialGradient>
      </defs>
      <circle className="logo-mark__ring logo-mark__ring--1" cx="24" cy="24" r="20" stroke="url(#pulse-g)" strokeWidth="1.5" />
      <circle className="logo-mark__ring logo-mark__ring--2" cx="24" cy="24" r="14" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
      <circle className="logo-mark__ring logo-mark__ring--3" cx="24" cy="24" r="8" stroke="#60A5FA" strokeWidth="1" opacity="0.4" />
      <circle cx="24" cy="24" r="5" fill="url(#pulse-core)" className="logo-mark__core" />
      <circle className="logo-mark__node logo-mark__node--1" cx="24" cy="6" r="2.5" fill="#93C5FD" />
      <circle className="logo-mark__node logo-mark__node--2" cx="40" cy="30" r="2" fill="#3B82F6" />
      <circle className="logo-mark__node logo-mark__node--3" cx="10" cy="32" r="2" fill="#60A5FA" />
      <path
        className="logo-mark__arc"
        d="M24 11 L24 18 M32 24 L25 24"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

function HexMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hex-g" x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#60A5FA" />
          <stop offset="0.5" stopColor="#2563EB" />
          <stop offset="1" stopColor="#0B3A6E" />
        </linearGradient>
        <linearGradient id="bolt-g" x1="18" y1="12" x2="32" y2="36">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#93C5FD" />
        </linearGradient>
      </defs>
      <path
        className="logo-mark__hex"
        d="M24 3 L42 13.5 V34.5 L24 45 L6 34.5 V13.5 Z"
        fill="url(#hex-g)"
        stroke="#93C5FD"
        strokeWidth="1"
      />
      <path
        className="logo-mark__bolt"
        d="M27 11 L19 25 H24 L21 37 L31 21 H26 L27 11Z"
        fill="url(#bolt-g)"
      />
      <circle className="logo-mark__spark logo-mark__spark--1" cx="14" cy="16" r="1.5" fill="#fff" />
      <circle className="logo-mark__spark logo-mark__spark--2" cx="36" cy="20" r="1" fill="#93C5FD" />
      <circle className="logo-mark__spark logo-mark__spark--3" cx="34" cy="36" r="1.2" fill="#fff" />
    </svg>
  );
}

function OrbitMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="orbit-g" x1="10" y1="8" x2="38" y2="42">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <ellipse className="logo-mark__orbit logo-mark__orbit--1" cx="24" cy="24" rx="18" ry="8" stroke="#3B82F6" strokeWidth="1" opacity="0.35" />
      <ellipse className="logo-mark__orbit logo-mark__orbit--2" cx="24" cy="24" rx="18" ry="8" stroke="#60A5FA" strokeWidth="1" opacity="0.5" transform="rotate(60 24 24)" />
      <path
        className="logo-mark__letter"
        d="M14 38 V14 H22 C27 14 30 17 30 21.5 C30 25 28 27.5 24.5 28 L32 38 H26 L19.5 28.5 H19 V38 H14Z M19 19 V24.5 H22 C24 24.5 25 23.5 25 21.8 C25 20 24 19 22 19 H19Z"
        fill="url(#orbit-g)"
      />
      <circle className="logo-mark__sat logo-mark__sat--1" cx="42" cy="24" r="2.5" fill="#93C5FD" />
      <circle className="logo-mark__sat logo-mark__sat--2" cx="8" cy="30" r="2" fill="#60A5FA" />
      <circle className="logo-mark__sat logo-mark__sat--3" cx="30" cy="8" r="1.5" fill="#fff" />
    </svg>
  );
}
