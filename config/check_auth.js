const passport = require('passport-local');

//Authentification check function
module.exports = checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    }
    else{
        res.redirect("/login/forbidden");
    }
}
