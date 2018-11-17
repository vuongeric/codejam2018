var ImagesService = require('../services/ImagesService');

module.exports = {
    
    getQuote: function(request, done) {

        ImagesService.getImageCategory(request, function(categories) {
            //call quote getter service with the categories and return quote
            return done(categories);
        })
        
    }
}