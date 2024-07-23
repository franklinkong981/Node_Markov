/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/); //splits words based on spaces and linebreak characters.
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {}
    this.words.forEach((word, index) => {
      //if chains doesn't contain that word, initialize its value as an empty array.
      if (!chains.hasOwnProperty(word)) {
        chains[word] = [];
      }
      //if it's not the first word and current word isn't in previous word's list of next words, add it to previous word's list of next words.
      if (index != 0 && !chains[this.words[index-1]].includes(word)) {
        chains[this.words[index-1]].push(word);
      }
      //if it's the last word, add null to its list of next words.
      if (index + 1 == chains.length) {
        chains[word].push(null);
      }
    });
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let listOfWords = [];
    for (let i = 0; i < numWords; i++) {
      if (i == 0) {
        const keys = Object.keys(this.chains);
        const firstWord = keys[Math.floor(Math.random() * keys.length)];
        listOfWords.push(firstWord);
      }
      else {
        const previousWord = listOfWords[i-1];
        const possibleNextWords = this.chains[previousWord];
        const selectedNextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
        //if the selected next word is null, we are done.
        if (!selectedNextWord) {
          break;
        }
        listOfWords.push(selectedNextWord);
      }
    }
    return listOfWords.join(" ");
  }
}
