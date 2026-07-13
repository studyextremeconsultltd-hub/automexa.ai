import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { navLinks } from "../data/content";
import { useQuote } from "../context/QuoteContext";
import BrandLogo from "./BrandLogo";
import "./Navbar.css";

export default function Navbar() {
  const { openQuote } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <BrandLogo variant="light" onClick={() => setOpen(false)} />

        <nav className={`navbar__links ${open ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="btn btn-primary navbar__quote-mobile"
            onClick={() => {
              setOpen(false);
              openQuote();
            }}
          >
            <Sparkles size={16} />
            Get Free Quote
          </button>
        </nav>

        <button type="button" className="btn btn-primary navbar__quote" onClick={openQuote}>
          <Sparkles size={16} />
          Get Free Quote
        </button>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
