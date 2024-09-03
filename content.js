let adWatchTime = 0;
let adStartTime = 0;

function checkForAds() {
  const adPlaying = document.querySelector('.ad-showing');
  
  if (adPlaying && adStartTime === 0) {
    adStartTime = Date.now();
  } else if (!adPlaying && adStartTime !== 0) {
    const adEndTime = Date.now();
    adWatchTime += adEndTime - adStartTime;
    adStartTime = 0;
    chrome.storage.local.set({adWatchTime});
  }
}

setInterval(checkForAds, 1000);
