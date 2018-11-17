var ImagesService = require('../services/ImagesService');
var QuotesService = require('../services/QuotesService');

module.exports = {
    
    getQuote: function(request, done) {

        ImagesService.getImageCategory(request, function(categories) {
            //TODO: parse categories to get all keywords and pass it
            QuotesService.findQuoteWithKeywords(["beach", "water", "sea", "sand"], function(quotes) {
                return done(quotes);
            })
        })
        
    }
}