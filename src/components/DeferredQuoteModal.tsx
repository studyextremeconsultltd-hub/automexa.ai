import { useEffect, useState, lazy, Suspense } from "react";
import { useQuote } from "../context/QuoteContext";

const QuoteModal = lazy(() => import("./QuoteModal"));

/** Mount quote UI only after idle or when the user opens it — cuts first-paint JS. */
export default function DeferredQuoteModal() {
  const { isOpen } = useQuote();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setReady(true);
      return;
    }
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(() => setReady(true), { timeout: 8000 });
    } else {
      timeoutId = window.setTimeout(() => setReady(true), 5000);
    }
    return () => {
      if (idleId != null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  if (!ready && !isOpen) return null;

  return (
    <Suspense fallback={null}>
      <QuoteModal />
    </Suspense>
  );
}
