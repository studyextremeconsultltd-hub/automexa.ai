import { openPayHub } from "../data/payments";
import "./PayHere.css";

/** Minimal teaser — payment details open in the Pay Now window */
export default function PayHere() {
  return (
    <>
      <section className="pay-here pay-here--teaser" id="pay-here">
        <div className="container pay-here__teaser-inner">
          <div>
            <p className="section-label">Secure Deposit</p>
            <h2 className="section-title">Ready to start? Pay your deposit</h2>
          </div>
          <button type="button" className="pay-here__logo-btn" onClick={() => openPayHub()}>
            <span className="pay-here__logo-text">
              <strong>Pay Now</strong>
              <em>Opens payment methods</em>
            </span>
            <span className="pay-here__logo-pulse" aria-hidden />
          </button>
        </div>
      </section>
    </>
  );
}
