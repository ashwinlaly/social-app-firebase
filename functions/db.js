const db = require('firebase-admin');

var serviceAccount = require("./serviceAccountKey.json");
db.initializeApp({
    credential: db.credential.cert(serviceAccount),
    databaseURL: "https://social-app-aa2c4.firebaseio.com"
});

const userRef = db.firestore().collection('users');
module.exports = userRef;