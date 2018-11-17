const userController = require("../controllers/UsersController");
const imageController = require("../controllers/ImagesController");
var jwt = require("jsonwebtoken");
var config = require("../../config");
var fs = require("fs");
const JWT_SECRET = config.jwt.secret;
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
  //--------USERS--------//
  //Read User
  app.get("/api/user/:userid", function (req, res) {
    userController.getUser(req.params.userid, result => {
      res.send(result);
    });
  });

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

