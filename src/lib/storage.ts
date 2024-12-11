import { storage } from "wxt/storage";

export const isExtensionEnabled = storage.defineItem<boolean>("local:enabled", {
  fallback: false,
});
