import { selectors, urls } from "@/config/content";
import { extensionConfig } from "@/config/ext";
import { extensionOptions } from "@/utils/storage";

function hideElement(el: Element | null | undefined) {
  if (el instanceof HTMLElement) {
    el.style.display = "none";
  }
}

export default defineContentScript({
  matches: ["*://www.instagram.com/*"],
  runAt: "document_start",

  async main() {
    const options = await extensionOptions.getValue();

    const mutationObserver = new MutationObserver(onMutation);

    if (!options.enabled) {
      console.log(`${extensionConfig.name} | Extension disabled. Exiting...`);
      return;
    } else {
      startObserver();
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
      const params = window.location.search;
      const body = document.body;

      // Hide navigation links
      const exploreLink = body?.querySelector(selectors.nav.explore);
      const reelsLink = body?.querySelector(selectors.nav.reels);
      options.blockExplore && hideElement(exploreLink);
      options.blockReels && hideElement(reelsLink);

      if (path === urls.base) {
        if (options.redirectMode === "messages") {
          window.location.href = urls.messages;
          return;
        }

        if (
          options.redirectMode === "following" &&
          !params.includes("variant=following")
        ) {
          window.location.href = urls.following;
        }

        // Hide stories
        const storyFeed = body?.querySelector(selectors.storyFeed);
        options.blockStories && hideElement(storyFeed);

        // Hide posts
        if (options.blockPosts === true) {
          const posts = body?.querySelector(selectors.posts.base);
          const postsLoader = body?.querySelector(selectors.posts.loader);
          const postsContainer = posts?.closest("div");
          hideElement(postsContainer);
          hideElement(postsLoader);
        }

        // Hide sidebar / suggested followers
        if (options.blockSidebar === true) {
          const sidebarBase = body?.querySelector(selectors.sidebar.base);
          const sidebar = sidebarBase?.nextElementSibling;
          hideElement(sidebar);
        } else if (options.blockSidebar === "suggested") {
          const suggestedFollowersLink = body?.querySelector(
            selectors.sidebar.suggestedFollowers
          );
          const suggestedFollowersTitle =
            suggestedFollowersLink?.closest("div");
          const suggestedFollowers =
            suggestedFollowersTitle?.nextElementSibling;
          hideElement(suggestedFollowers);
          hideElement(suggestedFollowersTitle);
        }
      }

      if (path.includes(urls.reels) && options.blockReels) {
        const main = body?.querySelector(selectors.main);
        hideElement(main);
      }

      if (path.includes(urls.explore) && options.blockExplore) {
        const main = body?.querySelector(selectors.main);
        hideElement(main);
      }

      if (path.includes(urls.stories) && options.blockStories) {
        const storiesSection = body?.querySelector("section");
        hideElement(storiesSection);
      }
    }
  },
});
