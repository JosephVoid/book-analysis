"use client";

export async function cache<T, Args extends any[]>(
  serverAction: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<T> {
  const key = JSON.stringify(args);
  const cachedData = localStorage.getItem(key);

  if (cachedData) {
    console.log("USED CACHED DATA", cachedData);
    return JSON.parse(cachedData);
  }

  const data = await serverAction(...args);
  if (data) localStorage.setItem(key, JSON.stringify(data));
  return data;
}
