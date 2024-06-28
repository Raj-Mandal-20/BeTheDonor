const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{

    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not Authorized!');
        error.statusCode = 401;
        throw error;
    }
    console.log(authHeader);

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'somesupersecret');
    }
    catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not Authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}