const defaultVolume = 100;
const KEY = "key";
let currVol;
let gainNode;

function initialize() {
  // initializing currVol and casting to number
  currVol = sessionStorage.getItem(KEY);
  if (currVol == null) {
    currVol = defaultVolume;
    sessionStorage.setItem(KEY, string(currVol));
  } 
  currVol = Number(currVol);

  // adds the listeners
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "getVolume") {
      sendResponse(currVol);
    }
    if (request.message === "saveVolume") {
      currVol = Number(request.value);
      sessionStorage.setItem(KEY, currVol);
    }
    if (request.message === "applyVolume") {
      gainNode = gainNode || setUpGainNode();

      if (gainNode) {
        let factor = currVol / 100;
        gainNode.gain.value = factor;
      }
    }
  });
}

function setUpGainNode() {
  const sound = document.querySelector("video");
  if (!sound) return null;
  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaElementSource(sound);
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;
  audioSource.connect(gainNode);
  gainNode.connect(audioContext.destination);
  return gainNode;
}

initialize();