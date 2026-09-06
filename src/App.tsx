import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import AdevEmbed from "./components/AdevEmbed";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const PaymentHub = lazy(() => import("./pages/PaymentHub"));
const Scorecard = lazy(() => import("./pages/Scorecard"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isPayHub = pathname === "/pay";

  return (
    <>
      <ScrollToTop />
      {!isPayHub && (
        <>
          <Navbar />
          <QuoteModal />
          <AdevEmbed />
        </>
      )}
      <Suspense fallback={<div className="route-fallback" aria-hidden />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/pay" element={<PaymentHub />} />
        </Routes>
      </Suspense>
      {!isPayHub && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <QuoteProvider>
        <AppShell />
      </QuoteProvider>
    </BrowserRouter>
  );
}
