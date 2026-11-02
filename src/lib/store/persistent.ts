"use client";

import { useSyncExternalStore } from "react";

/* Tiny localStorage-backed store read through useSyncExternalStore: the server
   (and first hydration pass) sees `fallback`, the client then swaps in the
   saved value without a mismatch, and other tabs stay in sync. */

export type Store<T> = {
  get: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
  getServer: () => T;
};

export function persistentStore<T>(key: string, fallback: T, persist = true): Store<T> {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  const get = () => {
    if (cache === undefined) {
      cache = fallback;
      if (persist) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) cache = JSON.parse(raw) as T;
        } catch {
          /* private mode / corrupt value: keep fallback */
        }
      }
    }
    return cache;
  };

  return {
    get,
    getServer: () => fallback,
    set(next) {
      cache = typeof next === "function" ? (next as (prev: T) => T)(get()) : next;
      if (persist) {
        try {
          localStorage.setItem(key, JSON.stringify(cache));
        } catch {
          /* quota / private mode: state still lives for this tab */
        }
      }
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) {
          cache = undefined;
          listener();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
}

export function useStore<T>(store: Store<T>) {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}

/** false during SSR and the hydration pass, true once client state is readable */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
const noopSubscribe = () => () => {};
