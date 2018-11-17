require('isomorphic-fetch');
const quotes = require('./quotes/quotes.json');

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

async function findQuoteWithKeywords(keywords, done, printMatch=false) {
    const output = [];
    for(var index in keywords) {
        const keyword = keywords[index];
        const quotes = await findQuoteWithKeyword(keyword);
        quotes.map(quote => output.push(quote));
    }
    return done(output);
}

async function getRelatedKeywords(keyword) {
    const res = await fetch('https://api.datamuse.com/words?rel_jjb=' + keyword);
    const json = await res.json();
    return json.map(e => e.word);
}
// test
// findQuoteWithKeyword('cat').then(res => console.log(res));

module.exports = {
    quotes,
    findQuoteWithKeyword,
    findQuoteWithKeywords,
    getRelatedKeywords
}



