var SchemaObject = require('schema-object');

var CaptionResponse = new SchemaObject({
    quotes: [{
        author: String,
        quote: String
    }],
    keywords: [String]
})

module.exports = CaptionResponse