chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ adWatchTime: 0 });
});
