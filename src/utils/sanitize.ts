/**
 * Sanitises free-text form values before they are placed into a mailto: URL.
 * Strips control characters (which could break the URL or smuggle extra
 * headers into some mail clients) and enforces a hard length cap.
 */
export function sanitizeField(value: FormDataEntryValue | null, maxLength = 500): string {
  return String(value ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLength);
}
