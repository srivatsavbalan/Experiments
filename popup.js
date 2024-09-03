document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['adWatchTime'], function(result) {
    const adTime = result.adWatchTime || 0;
    document.getElementById('ad-time').textContent = `Total time spent watching ads: ${Math.round(adTime / 1000)} seconds`;
  });
});
