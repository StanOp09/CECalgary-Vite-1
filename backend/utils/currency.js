const ZERO_DECIMAL = new Set([
  "bif", "clp", "djf", "gnf", "jpy", "kmf", "krw",
  "mga", "pyg", "rwf", "ugx", "vnd", "vuv", "xaf", "xof", "xpf",
]);

export function toMinorUnits(amountMajor, currency) {
  const n = Number(amountMajor);
  if (!Number.isFinite(n)) return 0;
  return ZERO_DECIMAL.has(currency) ? Math.round(n) : Math.round(n * 100);
}

export function fromMinorUnits(amountMinor, currency) {
  const n = Number(amountMinor);
  if (!Number.isFinite(n)) return 0;
  return ZERO_DECIMAL.has(currency) ? n : n / 100;
}

export async function withRetry(fn, retries = 3, delay = 1000) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}
