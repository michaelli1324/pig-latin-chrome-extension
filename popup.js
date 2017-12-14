var isTranslated = false;
var toggleText = ['ON', 'OFF']

document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = $('#toggleButton');
  console.log(toggleButton);
  toggleButton.click(function() {
    isTranslated = !isTranslated;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {translate: isTranslated});
    });
    $('#toggleButton').text(isTranslated ? toggleText[1] : toggleText[0]);
  });
})
