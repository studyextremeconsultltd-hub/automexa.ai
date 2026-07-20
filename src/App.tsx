import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import AdevEmbed from "./components/AdevEmbed";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import PaymentHub from "./pages/PaymentHub";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pay" element={<PaymentHub />} />
      </Routes>
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
