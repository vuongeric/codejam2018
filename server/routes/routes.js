const imageController = require("../controllers/ImagesController");
var jwt = require("jsonwebtoken");
var config = require("../../config");
var fs = require("fs");
const JWT_SECRET = config.jwt.secret;
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, 'TEMP_FILE');
  }
});
var upload = multer({ storage: storage })


module.exports = function (app) {

  //--------IBM IMAGE RECOGNITION--------//
  app.post("/api/image", upload.single('image'), function (req, res) {
    console.log(req.file);
    // fs.readFile(req.files.file.path, function(err, image) {
    //   console.log(fs);
    // });
    // console.log(req.image);
    imageController.getImageCategory(req.params, result => {
      res.send(result);
    });
  });
};

