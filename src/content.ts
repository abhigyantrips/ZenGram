import type { DefaultOptions as ContentSettings } from "@/types/content";
import type { PlasmoCSConfig } from "plasmo";

import { defaultOptions, labelsArray, selectors, urls } from "@/config/content";

export const config: PlasmoCSConfig = {
  matches: ["*://www.instagram.com/*"],
  all_frames: true,
  run_at: "document_start",
};

// Initialize settings with default values
let settings = defaultOptions;

// Function to initialize storage
function initializeStorage() {
  console.log("Initializing Storage");

  const loadSettingsPromise = new Promise<ContentSettings>(
    (resolve, reject) => {
      if (process.env.PLASMO_BROWSER === "chrome") {
        chrome.storage.sync.get(labelsArray, (result) => {
          if (chrome.runtime.lastError) {
            console.error("Chrome storage error:", chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
          } else {
            resolve(result as ContentSettings);
          }
        });
      } else if (process.env.PLASMO_BROWSER === "firefox") {
        browser.storage.sync
          .get(labelsArray)
          .then(resolve)
          .catch((error) => {
            console.error("Firefox storage error:", error);
            reject(error);
          });
      } else {
        console.error("Unknown browser environment");
        reject(new Error("Unknown browser environment"));
      }
    }
  );

  loadSettingsPromise
    .then((loadedSettings) => {
      console.log("Settings loaded:", loadedSettings);
      if (Object.keys(loadedSettings).length === 0) {
        console.log("No settings found, using defaults");
        // Set default options if no settings are found
        if (process.env.PLASMO_BROWSER === "chrome") {
          chrome.storage.sync.set(defaultOptions, () => {
            if (chrome.runtime.lastError) {
              console.error(
                "Error setting default options:",
                chrome.runtime.lastError
              );
            } else {
              console.log("Default options set for Chrome");
            }
          });
        } else if (process.env.PLASMO_BROWSER === "firefox") {
          browser.storage.sync
            .set(defaultOptions)
            .then(() => console.log("Default options set for Firefox"))
            .catch((error) =>
              console.error("Error setting default options:", error)
            );
        }
      } else {
        // Update settings with loaded values
        settings = loadedSettings;
        console.log("Settings updated:", settings);
      }

      // Start observing after settings are loaded
      startObserver();
      console.log("Started Observer");
    })
    .catch((error) => {
      console.error("Error in loadSettingsPromise:", error);
      // Start observer with default settings if there's an error
      startObserver();
      console.log("Started Observer with default settings due to error");
    });
}

function onMutation() {
  const path = window.location.pathname;
  const body = document.body;

  // Remove navigation links
  const exploreLink = body?.querySelector(selectors.nav.explore);
  const reelsLink = body?.querySelector(selectors.nav.reels);
  settings.blockExplore && exploreLink?.remove();
  settings.blockReels && reelsLink?.remove();

  if (path === urls.base) {
    // Remove stories
    const storyFeed = body?.querySelector(selectors.storyFeed);
    settings.blockStories && storyFeed?.remove();

    // Remove posts
    const posts = body?.querySelector(selectors.posts.base);
    const postsLoader = body?.querySelector(selectors.posts.loader);
    const postsContainer = posts?.closest("div");
    settings.blockPosts && postsContainer?.remove();
    settings.blockPosts && postsLoader?.remove();

    // Remove sidebar / suggested followers
    if (settings.blockSidebar === true) {
      const sidebarBase = body?.querySelector(selectors.sidebar.base);
      const sidebar = sidebarBase?.nextElementSibling;
      sidebar.remove();
    } else if (settings.blockSidebar === "suggested") {
      const suggestedFollowersLink = body?.querySelector(
        selectors.sidebar.suggestedFollowers
      );
      const suggestedFollowersTitle = suggestedFollowersLink?.closest("div");
      const suggestedFollowers = suggestedFollowersTitle?.nextElementSibling;
      suggestedFollowers?.remove();
      suggestedFollowersTitle?.remove();
    }
  }

  if (path.includes(urls.reels) && settings.blockReels) {
    const main = body?.querySelector(selectors.main);
    main?.remove();
  }

  if (path.includes(urls.explore) && settings.blockExplore) {
    const main = body?.querySelector(selectors.main);
    main?.remove();
  }

  if (path.includes(urls.stories) && settings.blockStories) {
    const storiesSection = body?.querySelector("section");
    storiesSection?.remove();
  }
}

const mutationObserver = new MutationObserver(onMutation);

function startObserver() {
  mutationObserver.observe(document, {
    subtree: true,
    childList: true,
  });

  // Initial check
  onMutation();

  console.log("Reached Observer Start");
}

// Initialize the extension
initializeStorage();

console.log("Initial settings:", settings);

export {};
