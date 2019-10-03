var express = require('express'),
    UploadRoute = express.Router(),
    Multer = require('multer'),
    Upload = Multer({ dest : 'uploads/' });

var route = function () {

    UploadRoute.post('/image/user', Upload.single('image') , (req, res) => {
        res.send(req.body);
    });

    return UploadRoute;

}

module.exports = route;