var QuoteManagement = require('../managements/QuotesManagement');

module.exports = {
    
    getImageCategory: function(request, done) {

        QuoteManagement.getQuote(request, function(quote) {
            return done(quote);
        })
        
    }
}