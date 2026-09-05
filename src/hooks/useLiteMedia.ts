import { useEffect, useState } from "react";

function readLite() {
  if (typeof window === "undefined") return false;
  const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData,
  );
  return reducedData || saveData;
}

/** Save-Data / reduced-data only. Width must not freeze the hero board. */
export function useLiteMedia() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const apply = () => setLite(readLite());
    apply();
    const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
    conn?.addEventListener?.("change", apply);
    return () => conn?.removeEventListener?.("change", apply);
  }, []);

  return lite;
}
