//---------------------------------------------------
//                      IMPORTS
//---------------------------------------------------
const bcrypt = require("bcrypt");
const UserSchema = require("../models/UserSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//---------------------------------------------------
//                 CODE
//---------------------------------------------------


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserSchema.findById(id, (err, user) => {
        done(err, user);
    });
});


// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email_adress" }, (email_adress, password, done) => {
        
        UserSchema.findOne({ email_adress: email_adress })
            .exec( (err, user) => {
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false, {message : "Incorrect username"});
                }
                
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Wrong password" });
                    }
                });
            });
    })
);

module.exports = passport;