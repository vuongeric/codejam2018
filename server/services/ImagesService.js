const config = require('../../config');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    iam_apikey: config.apikey
});

module.exports = {

    getImageCategory: function (request, done) {
        // Classify an image

        //TODO: actually get the file uploaded
        var images_file = fs.createReadStream('./uploads/TEMP_FILE');
        var classifier_ids = ["default"];
        var threshold = 0.6;

        var params = {
            images_file: images_file,
            classifier_ids: classifier_ids,
            threshold: threshold
        };

        visualRecognition.classify(params, function (err, response) {
            if (err) {
                console.log(err);
            }

            else {
                return done(response);
                //console.log(JSON.stringify(response, null, 2))
            }
        });
    }

}
