/* UI-PREVIEW GATE — one shared password, no accounts. Kept import-free so
   proxy.ts can use it. TODO(backend): replace with Payload's admin users
   (email + password, roles); proxy.ts and the panel layout then check a real
   session instead. */
export const ADMIN_COOKIE = "wm-admin";
export const ADMIN_TOKEN = "preview";
export const PREVIEW_PASSWORD = "1234";
