"use client";

export async function cache<T, Args extends any[]>(
  serverAction: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<{ data: T; cached: boolean }> {
  const key = JSON.stringify(args);
  const cachedData = localStorage.getItem(key);

  if (cachedData) {
    return { data: JSON.parse(cachedData), cached: true };
  }

  const data = await serverAction(...args);
  if (data) localStorage.setItem(key, JSON.stringify(data));
  return { data, cached: false };
}
