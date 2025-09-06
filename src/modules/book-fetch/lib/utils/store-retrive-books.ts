"use client";

import { Book } from "@/src/types";

export function storeBookLocalStorage(book: Book) {
  localStorage.setItem(String(book.id), JSON.stringify(book));
}

export function retriveBookLocalStorage(id: string) {
  const book = localStorage.getItem(id);
  return book ? JSON.parse(book) : null;
}

export function deleteBookLocalStorage(id: string) {
  localStorage.removeItem(id);
}

export async function cache<T, Args extends any[]>(
  serverAction: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<T> {
  const key = JSON.stringify(args);
  const cachedData = localStorage.getItem(key);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const data = await serverAction(...args);
  if (data) localStorage.setItem(key, JSON.stringify(data));
  return data;
}
