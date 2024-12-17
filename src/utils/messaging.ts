export function updateTabsOnSave() {
  browser.tabs.query({ url: "*://www.instagram.com/*" }).then((tabs) => {
    for (const tab of tabs) {
      browser.tabs.sendMessage(tab.id!, {
        type: "EXT_SETTINGS_UPDATED",
      });
    }
  });
}
