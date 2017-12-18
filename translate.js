var pigLatin = (word) => {
  const firstPart = word.slice(0, firstVowelIndex(word));
  const secondPart = word.slice(firstVowelIndex(word));
  return `${secondPart}${firstPart}ay`;
}

var firstVowelIndex = (word) => {
  const vowels = word.match(/[aeiou]/g);

  if(vowels[0] == 'u' && word[word.indexOf('u') - 1] == 'q'){
    return word.indexOf(vowels[1])
  }
  return word.indexOf(vowels[0]);
}

export { pigLatin };
