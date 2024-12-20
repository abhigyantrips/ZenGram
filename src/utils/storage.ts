import { storage } from "wxt/storage";

import { defaultOptions } from "@/config/content";
import { ExtensionOptions } from "@/types/content";

export const extensionOptions = storage.defineItem<ExtensionOptions>(
  "local:extensionOptions",
  {
    fallback: defaultOptions,
    version: 1,
  }
);
