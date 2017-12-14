const vowels = ['a', 'e', 'i', 'o', 'u'];
var original = $('body').clone();

chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if(request.translate){
      var elements = document.getElementsByTagName('*');
      for(var i=0; i<elements.length; i++) {
        var element = elements[i];
        var childrenNodes = element.childNodes;
        for(var j=0; j<childrenNodes.length; j++) {
          var node = childrenNodes[j];
          if(node.nodeType == 3) {
            var text = node.nodeValue;
            var words = text.split(" ");
            var newText = words.map(word => pigLatin(word)).join(' ');
            node.replaceWith(document.createTextNode(newText));
          }
        }
      }
    } else {
      $('body').html(original);
      original = $('body').clone();
    }
  }
);

function pigLatin(word) {
  if(word.length < 3) {
    return word;
  } else if(startsWithVowel(word)) {
    return word + 'way'
  } else if (secondLetterVowel(word)) {
    return word.slice(1) + word[0] + 'ay'
  } else {
    return word.slice(2) + word.slice(0, 2) + 'ay'
  }
}

function startsWithVowel(word) {
  return word.toLowerCase()[0] in vowels;
}

function secondLetterVowel(word) {
  return word.toLowerCase()[1] in vowels
}
