import { useEffect, useState } from "react";

function readLite() {
  if (typeof window === "undefined") return true;
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData,
  );
  return narrow || reducedData || saveData;
}

/** Phones / Save-Data: skip HD video and extra first-paint imagery. */
export function useLiteMedia() {
  const [lite, setLite] = useState(readLite);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const onChange = () => setLite(readLite());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return lite;
}
