/** Textual markov chain generator */
const fs = require('fs')

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    this.makeText();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordMap = {}

    for(let i=0; i<this.words.length-1; i++) {
      let currWord = this.words[i].toLowerCase()
      let valWord = this.words[i+1].toLowerCase()

      if (!(currWord in wordMap)) {
        wordMap[currWord] = new Array(valWord)
      } else {
        wordMap[currWord].push(valWord)
      }
    }
    
    let lastWord = this.words[this.words.length-1]
    
    if (lastWord in wordMap) {
      wordMap[lastWord].push(null)
    } else {
      wordMap[lastWord] = new Array(null)
    }

    this.wordMap = wordMap
  }


  /** return random text from chains */
  makeText(numWords = 100) {
    
    let output = this.words[0] + ' ';

    for (let i=0; i<this.words.length; i++) {
      let currWord = this.words[i].toLowerCase()
      
      let idx = Math.floor(Math.random()*this.wordMap[currWord].length)
      
      let newWord = this.wordMap[currWord][idx]

      if (newWord !== null && numWords > 0) {
        output += `${newWord} `
      } else {
        return output
      }
      numWords --
    }
    return output
  }
}


// let content = fs.readFileSync('eggs.txt', 'utf8')
// let machiene = new MarkovMachine(content)
// console.log(machiene.makeText())

module.exports = {
  MarkovMachine: MarkovMachine
}