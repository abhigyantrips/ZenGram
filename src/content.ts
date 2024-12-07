import type { DefaultOptions as ContentSettings } from "@/types/content";
import type { PlasmoCSConfig } from "plasmo";

import { defaultOptions, labelsArray, selectors, urls } from "@/config/content";

import { extensionConfig } from "./config/ext";

export const config: PlasmoCSConfig = {
  matches: ["*://www.instagram.com/*"],
  run_at: "document_start",
};

let settings = defaultOptions;
const mutationObserver = new MutationObserver(onMutation);

initializeStorage();

function initializeStorage() {
  const loadSettingsPromise = new Promise<ContentSettings>(
    (resolve, reject) => {
      switch (process.env.PLASMO_BROWSER) {
        case "chrome":
          chrome.storage.sync.get(labelsArray, (result) => {
            if (chrome.runtime.lastError) {
              console.error(
                `${extensionConfig.name} | Chrome storage error:`,
                chrome.runtime.lastError
              );
              reject(chrome.runtime.lastError);
            } else {
              resolve(result as ContentSettings);
            }
          });
          break;
        case "firefox":
          browser.storage.sync
            .get(labelsArray)
            .then(resolve)
            .catch((error) => {
              console.error(
                `${extensionConfig.name} | Chrome storage error:`,
                error
              );
              reject(error);
            });
          break;
      }
    }
  );

  loadSettingsPromise
    .then((loadedSettings) => {
      // Set default options if no settings are found
      if (Object.keys(loadedSettings).length === 0) {
        switch (process.env.PLASMO_BROWSER) {
          case "chrome":
            chrome.storage.sync.set(defaultOptions, () => {
              if (chrome.runtime.lastError) {
                console.error(
                  `${extensionConfig.name} | Error setting default options:`,
                  chrome.runtime.lastError
                );
              }
            });
            break;
          case "firefox":
            browser.storage.sync
              .set(defaultOptions)
              .catch((error) =>
                console.error(
                  `${extensionConfig.name} | Error setting default options:`,
                  error
                )
              );
            break;
        }
      } else {
        settings = loadedSettings;
        console.log(`${extensionConfig.name} | Settings loaded:`, settings);
      }
    })
    .catch((error) => {
      console.error(
        `${extensionConfig.name} | Error while loading settings:`,
        error
      );
    })
    .finally(() => {
      startObserver();
    });
}

function startObserver() {
  mutationObserver.observe(document, {
    subtree: true,
    childList: true,
  });

  onMutation();
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

export {};
