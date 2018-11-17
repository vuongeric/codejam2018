var ImagesService = require('../services/ImagesService');

module.exports = {
    
    getImageCategory: function(request, done) {

        ImagesService.getImageCategory(request, function(categories) {
            return done(categories);
        })
        
    }
}