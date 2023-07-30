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
                document.getElementById("output").textContent = response + "%";
            }
        );
    },
  );
}

function changeVolume() {
  console.log("change volume");
  document.getElementById("output").textContent = document.getElementById("volumeSlider").value + "%";
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
