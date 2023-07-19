const defaultVolume = 100;

function initialize() {
  document.getElementById("volumeSlider").addEventListener("input", changeVolume);
  chrome.tabs.query({active: true, currentWindow: true},
    function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                message: "getVolume",
            },
            function (response) {
                document.getElementById("volumeSlider").value = response;
                document.getElementById("volume").textContent = response + "%";
            }
        );
    },
  );
}

function changeVolume() {
  document.getElementById("volume").textContent = document.getElementById("volumeSlider").value + "%";
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {
            message: "saveVolume",
            value: document.getElementById("volumeSlider").value
        });
  });
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {
            message: "applyVolume", 
        });
  }); 
}


initialize();
