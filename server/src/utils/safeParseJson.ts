export function safeParseJson<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text);
  } catch {
    // Attempt to extract first {...} block
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
    return fallback;
  }
}
