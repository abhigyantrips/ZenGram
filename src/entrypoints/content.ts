import type { DefaultOptions as ContentSettings } from "@/types/content";

import { defaultOptions, labelsArray, selectors, urls } from "@/config/content";
import { extensionConfig } from "@/config/ext";
import { isExtensionEnabled } from "@/lib/storage";

export default defineContentScript({
  matches: ["*://www.instagram.com/*"],
  runAt: "document_start",
  async main() {
    const isEnabled = await isExtensionEnabled.getValue();

    if (!isEnabled) {
      console.log(`${extensionConfig.name} | Extension disabled. Exiting...`);
      return;
    } else {
      initializeStorage();
    }

    let settings = defaultOptions;
    const mutationObserver = new MutationObserver(onMutation);

    function initializeStorage() {
      const loadSettingsPromise = new Promise<ContentSettings>(
        (resolve, reject) => {
          browser.storage.sync.get(labelsArray, (result) => {
            if (chrome.runtime.lastError) {
              console.error(
                `${extensionConfig.name} | Browser storage error:`,
                chrome.runtime.lastError
              );
              reject(chrome.runtime.lastError);
            } else {
              resolve(result as ContentSettings);
            }
          });
        }
      );

      loadSettingsPromise
        .then((loadedSettings) => {
          // Set default options if no settings are found
          if (Object.keys(loadedSettings).length === 0) {
            browser.storage.sync.set(defaultOptions, () => {
              if (chrome.runtime.lastError) {
                console.error(
                  `${extensionConfig.name} | Error setting default options:`,
                  chrome.runtime.lastError
                );
              }
            });
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
          sidebar?.remove();
        } else if (settings.blockSidebar === "suggested") {
          const suggestedFollowersLink = body?.querySelector(
            selectors.sidebar.suggestedFollowers
          );
          const suggestedFollowersTitle =
            suggestedFollowersLink?.closest("div");
          const suggestedFollowers =
            suggestedFollowersTitle?.nextElementSibling;
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
  },
});
