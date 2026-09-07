import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sparkles, CreditCard } from "lucide-react";
import { navLinks } from "../data/content";
import { openPayHub } from "../data/payments";
import { useQuote } from "../context/QuoteContext";
import BrandLogo from "./BrandLogo";
import "./Navbar.css";

export default function Navbar() {
  const { openQuote } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handlePayNow() {
    setOpen(false);
    openPayHub();
  }

  function closeMenu() {
    setOpen(false);
  }

  const barSolid = scrolled || open;

  return (
    <>
      <header
        className={`navbar ${barSolid ? "navbar--solid" : ""} ${open ? "navbar--open" : ""}`}
      >
        <div className="container navbar__inner">
          <BrandLogo variant="light" onClick={closeMenu} />

          <nav className="navbar__desktop" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === "/"}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button type="button" className="btn btn-primary navbar__quote" onClick={openQuote}>
            <Sparkles size={16} />
            Get Free Quote
          </button>

          <button type="button" className="btn navbar__pay-now" onClick={handlePayNow}>
            <CreditCard size={18} />
            <span className="navbar__pay-now-label">Pay Now</span>
            <span className="navbar__pay-now-shine" aria-hidden />
          </button>

          <button
            type="button"
            className="navbar__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Drawer is a sibling of header — NOT inside backdrop-filter / transform parents.
          Scrolled navbar used to trap position:fixed and collapse the menu. */}
      <div
        id="mobile-nav-drawer"
        className={`navbar__drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <nav className="navbar__drawer-nav" aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="btn btn-primary navbar__drawer-cta"
            onClick={() => {
              closeMenu();
              openQuote();
            }}
          >
            <Sparkles size={16} />
            Get Free Quote
          </button>
          <button type="button" className="btn navbar__pay-now navbar__drawer-cta" onClick={handlePayNow}>
            <CreditCard size={16} />
            Pay Now
          </button>
        </nav>
      </div>

      {open ? (
        <button
          type="button"
          className="navbar__scrim"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </>
  );
}
