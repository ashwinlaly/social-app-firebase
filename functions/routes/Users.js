var express = require('express'),
    userRef = require('../db'),
    userRoute = express.Router();

var route = function () {

    userRoute.get('/users', (req,res) => {
        userRef.orderBy('createdat','desc').get().then( data => {
            let users = [];
            data.forEach( dt => {
                users.push(dt.data());
            });
            res.status(200).send({
                    users, 
                    message : "Get all user data.",
                    status : 200
                }
            );
        }).catch( err => {
            res.status(400).send({
                message : "Something went wrong.",
                status : 400 
            });
        });
    });

    userRoute.get('/user/:id', (req,res) => {
        
    });

    userRoute.post('/user', (req,res) => {
        var user = {
            name : req.body.name,
            email : req.body.email,
            createdat : new Date().toISOString(),
            age : req.body.age
        };
        // db.firestore.Timestamp.fromDate(new Date())
        userRef.add(user).then( res => {
            res.status(200).send({
                message : "User Created",
                status : 200
            });
        }).catch(err => {
            res.status(400).send({
                message : "Something went wrong.",
                status : 400
            });
        });
    });

    userRoute.patch('/user', (req,res) => {
        res.send('patch');
    });

    userRoute.delete('/user/id', (req,res) => {
        res.send('delete');
    });

    return userRoute;
}

module.exports = route;