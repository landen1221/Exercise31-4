/** Command-line tool to generate Markov text. */
const axios = require('axios');
const fs = require('fs');
const { MarkovMachine } = require('./markov')
const argv = process.argv;

// let machiene = new MarkovMachine(content)

function fileMarkov(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error", err);
            process.exit(1);
        }
 
        let fileContent = new MarkovMachine(data)
        console.log(fileContent.makeText())
    })
}

async function linkMarkov(path) {
    try {
        let content = await axios.get(path)
        let fileContent = new MarkovMachine(content.data)
        console.log(fileContent.makeText())
    } catch(e) {
        console.log("Error: Not a valid link.", e)
        process.exit(1)
    }
}

let path = process.argv[3]


if (process.argv[2] == 'url') {
    linkMarkov(path)
} else if (process.argv[2] == 'file') {
    fileMarkov(path)
} else {
    throw "not a valid file path. Expecting 'url' or 'file'"
}
