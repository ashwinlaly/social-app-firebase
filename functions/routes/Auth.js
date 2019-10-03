const express = require('express'),
      authRoute = express.Router(),
      db = require('../db'),
      firebase = require('firebase');
    
const route = function () {

    authRoute.post('/signin', (req,res) => {
        const user = {
            email : req.body.email,
            password : req.body.password
        };
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(data => {
            return data.user.getIdToken();
        }).then( token => {
            res.status(200).json({
                token,
                message : "Logged in Succesfully",
                status : 200
            });
        }).catch( err => {
            res.status(400).json({
                message : err.message,
                status : 400
            });
        });
    });

    authRoute.post('/signup', (req,res) => {
        const user = {
            email : req.body.email,
            password : req.body.password
        };
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then( data => {
            console.log("data",data);
            res.status(200).json({
                message : "user created successfully",
                status : 200
            });
        }).catch( err => {
            res.status(400).json({
                message : err,
                status : 400
            });
        });
    });

    return authRoute;

}

module.exports = route;