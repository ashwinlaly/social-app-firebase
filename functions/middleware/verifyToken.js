module.exports = (req,res,next) => {
    let token;
    if(req.headers.token){
        token = req.headers.token.split('Beaber ')[1];
        req['token'] = token;
        return next();
    } else {
        return res.status(405).json({
            message : "No Access Token",
            status : 405
        });
    }
}