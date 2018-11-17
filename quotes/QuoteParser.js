const fs = require('fs');
require('isomorphic-fetch');

const FILE_DIRECTORY = 'quotes.json';
const SEPARATOR = '$$$';
const NEWLINE = '\n';

const quotes = require('./quotes.json');

function writeToFile(content) {
    fs.appendFile(FILE_DIRECTORY, content);

}

async function findQuoteWithKeyword(keyword, printMatch = false) {
    const relatedWords = await getRelatedKeywords(keyword);
    const possibleQuotes = [];
    relatedWords.map(word => {
        let quote = quotes.find(e => e.quote.includes(word));
        if (!quote) {
            return;
        }
        if (printMatch) {
            console.log('matched with', word);
        }
        possibleQuotes.push(quote);
    })
    return possibleQuotes;

}

async function getRelatedKeywords(keyword) {
    const res = await fetch('https://api.datamuse.com/words?rel_jjb=' + keyword);
    const json = await res.json();
    return json.map(e => e.word);
}
// test
// findQuoteWithKeyword('cat').then(res => console.log(res));



