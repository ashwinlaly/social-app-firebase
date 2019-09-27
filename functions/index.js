//
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const express = require('express'),
      app = express(),
      db = require('./db'),
      functions = require('firebase-functions');

const userRoute = require('./routes/Users')();
app.use(userRoute);

app.all("*",(req,res) => {
    var message = `Invalid ${req.method} Access.`;
    var status = 400;
    res.status(400).json({
        message,status
    });
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);