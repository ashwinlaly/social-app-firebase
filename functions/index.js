require('dotenv').config()
const express = require('express'),
      app = express(),
      db = require('./db'),
    //   bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      Morgan = require('morgan'),
      functions = require('firebase-functions');

app.use(Morgan('dev'));
// app.use(bodyParser.urlencoded({ extended : false }));
// app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRECT));

// app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT')
// });

const authRoute = require('./routes/Auth')();
const userRoute = require('./routes/Users')();
const uploadRoute = require('./routes/Uploads')();
app.use(authRoute);
app.use(userRoute);
app.use(uploadRoute);

app.all("*",(req,res) => {
    var message = `Invalid ${req.method} Access.`;
    var status = 404;
    res.status(404).json({
        message,status
    });
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);