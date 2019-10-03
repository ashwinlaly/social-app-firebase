const admin = require('firebase-admin');

module.exports = (req,res,next) => {
    admin.auth().verifyIdToken(token)
    .then(decodedToken => {
       return next(); 
    }).catch(err => {
        return res.status(406).json({
            message : "Invalid Access Token",
            status : 406
        });
    });
}