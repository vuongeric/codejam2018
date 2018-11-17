require('isomorphic-fetch');
const quotes = require('./quotes/quotes.json');
const SPACE = ' ';

async function findQuoteWithKeywords(keywords, done, printMatch = false) {
    console.log('keywords', keywords);
    const output = [];
    let findSynonym = true;
    // find quotes with keywords
    for (var index in keywords) {
        const keyword = keywords[index];
        const quote = await findQuoteWithKeyword(keyword, !findSynonym, true);
        if (quote.length !== 0) {
            output.push(quote);
        }
    }
    console.log('output', output);
    // find quotes with related keywords
    if (output.length === 0) {
        for (var index in keywords) {
            const keyword = keywords[index];
            const quotes = await findQuoteWithKeyword(keyword, findSynonym, true);
            quotes.map(quote => output.push(quote));
        }
    }
    // get random quote
    if(output.length === 0) {
        console.log('No related quotes found, generating random quote!');
        let randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        output.push(randomQuote);
    }
    return done(output);
}

async function findQuoteWithKeyword(keyword, findSynonym = false, printMatch = false) {
    const possibleQuotes = [];
    if (findSynonym) {
        const relatedWords = await getRelatedKeywords(keyword);
        relatedWords.map(word => {
            const pattern = `\w*\\b${word}\\b\w*`;
            let quote = quotes.find(e => e.quote.match(pattern));
            if (!quote) {
                return;
            }
            if (printMatch) {
                console.log('matched with', word);
            }
            possibleQuotes.push(quote);
        })
    } else {
        console.log('fetching with brute');
        const pattern = `\w*\\b${keyword}\\b\w*`;
        quotes.map(e => {
            if (e.quote.match(pattern)) {
                if (printMatch) {
                    console.log('matched with', keyword);
                    console.log('quote:', e.quote);
                }
                possibleQuotes.push(e);
            }
        })
    }
    return possibleQuotes;

}

async function getRelatedKeywords(keyword) {
    console.log('fetching with muse');
    const res = await fetch('https://api.datamuse.com/words?ml=' + keyword);
    const json = await res.json();
    return json.map(e => e.word);
}

module.exports = {
    quotes,
    findQuoteWithKeyword,
    findQuoteWithKeywords,
    getRelatedKeywords
}



