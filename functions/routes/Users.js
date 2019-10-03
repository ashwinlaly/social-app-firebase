const   express = require('express'),
        userRoute = express.Router(),
        userRef = require('../db').userRef,
        verifyToken = require('../middleware/verifyToken'),
        verifyUser = require('../middleware/verifyUser');

var route = function () {

    userRoute.get('/user/setCookie',(req,res) => {
        let configco = {
            httpOnly : true,
            maxAge : 10000000,
            signed : true
        };
        res.cookie('name','2',configco);
        res.send("1");
    });
    userRoute.get('/user/getCookie', (req,res) => {
        console.log(req.signedCookies.name);
        res.send(
            {
                "signedcookie" : req.signedCookies,
                "cookie" : req.cookies,
            }
        );
    });

    //[verifyToken, verifyUser],
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

    userRoute.get('/user/:id',[verifyToken, verifyUser], (req,res) => {
        
    });

    userRoute.post('/user', (req,res) => {
        var user = {
            name : req.body.name,
            email : req.body.email,
            createdat : new Date().toISOString(),
            age : req.body.age
        };
        // db.firestore.Timestamp.fromDate(new Date())
        userRef.add(user).then( data => {
            res.status(200).send({
                message : "User Created",
                status : 200
            });
        }).catch(err => {
            res.status(400).send({
                message : err,
                status : 400
            });
        });
    });

    userRoute.patch('/user',[verifyToken, verifyUser],(req,res) => {
        res.send('patch');
    });

    userRoute.delete('/user/:id',[verifyToken, verifyUser], (req,res) => {
        res.send('delete');
    });

    return userRoute;
}

module.exports = route;