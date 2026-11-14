const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    signal: options.signal ?? AbortSignal.timeout(2500),
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export function rememberLocalAction(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown[];
  current.push({ value, createdAt: new Date().toISOString() });
  window.localStorage.setItem(key, JSON.stringify(current));
}
