import { useEffect, useState } from "react";

function readNarrow(bp = 900) {
  return typeof window !== "undefined" && window.matchMedia(`(max-width: ${bp}px)`).matches;
}

function readSaveData() {
  if (typeof window === "undefined") return false;
  const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData,
  );
  return reducedData || saveData;
}

/** Phone / tablet width — use for layout + stills-only media. */
export function useIsMobile(bp = 900) {
  const [mobile, setMobile] = useState(() => readNarrow(bp));

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [bp]);

  return mobile;
}

/**
 * Skip HD video / heavy motion: phones OR Save-Data.
 * Stills + mosaic stay visible so the site still looks premium.
 */
export function useLiteMedia() {
  const mobile = useIsMobile();
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const apply = () => setSaveData(readSaveData());
    apply();
    const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
    conn?.addEventListener?.("change", apply);
    return () => conn?.removeEventListener?.("change", apply);
  }, []);

  return mobile || saveData;
}
