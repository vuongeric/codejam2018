var ImagesService = require('../services/ImagesService');
var QuotesService = require('../services/QuotesService');

module.exports = {

    getQuote: function (request, done) {

        ImagesService.getImageCategory(request, function (categories) {
            var classes = categories.images[0].classifiers[0].classes;
            var keywords = [];

            classes.map(x => {
                keywords.push(x.class)
            })

            QuotesService.findQuoteWithKeywords(keywords, function (quotes) {
                return done({
                    quotes: quotes,
                    keywords: keywords
                    });
            })
        })

    }
}