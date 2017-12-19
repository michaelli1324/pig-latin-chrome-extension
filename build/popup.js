var isTranslated = false;
var toggleText = ['ON', 'OFF'];

document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = $('#toggleButton');
  toggleButton.click(function () {
    isTranslated = !isTranslated;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { translate: isTranslated });
      console.log('sent');
    });
    $('#toggleButton').text(isTranslated ? toggleText[1] : toggleText[0]);
  });
});
//# sourceMappingURL=popup.js.map