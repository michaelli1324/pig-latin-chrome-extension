var original = $('html').clone();

chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if(request.translate){
      var elements = document.querySelector('body');
      var node;
      var walker = document.createNodeIterator(elements, NodeFilter.SHOW_TEXT,
        { acceptNode: function(node) {
          if(node.nodeValue) {
            return NodeFilter.FILTER_ACCEPT;
          };
        }
      },
      false);
      while(node=walker.nextNode()){
        console.log(node);
        var newNode = node
                        .nodeValue
                        .split(" ")
                        .map(word => pigLatin(word))
                        .join(' ');

        node.nodeValue = newNode;
      }
    }
    else {
      $('html').html(original);
    }
  }
);

var pigLatin = (word) => {
  if(/^[a-zA-Z0-9_]/g.test(word[0])){
    const firstPart = word.slice(0, firstVowelIndex(word));
    const secondPart = word.slice(firstVowelIndex(word));
    return `${secondPart}${firstPart}ay`;
  }
}

var firstVowelIndex = (word) => {
  const vowels = word.match(/[aeiou]/g);
  if(vowels === null){
    return word;
  }
  if(vowels[0] == 'u' && word[word.indexOf('u') - 1] == 'q'){
    return word.indexOf(vowels[1])
  }
  return word.indexOf(vowels[0]);
}
