const db = require('firebase-admin');
const firebase = require('firebase');

var serviceAccount = require("./serviceAccountKey.json");
db.initializeApp({
    credential: db.credential.cert(serviceAccount),
    databaseURL: "https://social-app-aa2c4.firebaseio.com",
    storageBucket : "social-app-aa2c4.appspot.com"
});

var firebaseConfig = require('./firebaseConfigKey.json');
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();

const userRef = db.firestore().collection('users');
module.exports= {
    userRef,
    fireBucket : db.storage().bucket()
};