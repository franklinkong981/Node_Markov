/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require('./markov');
const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

async function makeTextFromCommandLine() {
    if (argv[2] == 'file') {
        makeTextFromFile(argv[3]);
    }
    else {
        await makeTextFromURL(argv[3]);
    }
}

function makeTextFromFile(filePath) {
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) { 
            console.log("ERROR: ", error);
            process.kill(1); 
        }
        let mm = new MarkovMachine(data);
        const text = mm.makeText();
        console.log(`...generated text from file ${filePath}...`);
        console.log(text);
    });    
}

async function makeTextFromURL(url) {
    try {
        const {data} = await axios.get(url);
        let mm = new MarkovMachine(data);
        const text = mm.makeText();
        console.log(`...generated text from the URL ${url}...`);
        console.log(text);
    }
    catch(error) {
        console.log("ERROR: ", error);
        process.kill(1);
    }
}

makeTextFromCommandLine();