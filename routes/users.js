//===================================================
//              IMPORTS
//===================================================
const express = require('express');
const router = express.Router();
const { check, validationResult, } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = mongoose.model('UserSchema');
const passport = require('passport');


//===================================================
//              ROUTES
//===================================================

//Register page
router.get('/register', (req, res) =>{
    res.render('register',{
    user: req.user,
    errors : null,
    data : null });
});

router.post('/register',
    [ //Validation chain
        check('last_name')
            .isLength({min :1}).withMessage("Please enter a valid last name")
            .bail()
            .trim(),
        check('first_name')
            .isLength({min :1}).withMessage("Please enter a valid first name")
            .bail()
            .trim(),
        check('email_adress')
            .isEmail().withMessage("Please enter a valid email adress")
            .bail()
            .trim()
            .normalizeEmail(),
        check('dOB')
            .isLength({min :6}).withMessage("Please fill the date of birth")
            .exists({checkNull : true}).withMessage("Please fill the date of birth")
            .custom(( value ) =>{
                //Custom validator for date
                let today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const yyyy = today.getFullYear();
                today = yyyy +'-' + mm +'-'+ dd;
                return( value <= today);
            }).withMessage('You cannot be born after today, come on. Please enter a valid birth-day'),
        check('password')
            .isLength({min :6}).withMessage("Password must be longer than 6 characters")
            //matching passwords input
            .custom(( value, {req} ) => {
                return (value === req.body.password_confirm);
            }).withMessage("Passwords doesn't match")
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            //---------------------------------------------------
            //       GENERATING PASSWORD & SAVING USER
            //---------------------------------------------------
            
            //Generating crypted password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash( req.body.password , salt, (err, hash) =>{
                    //Generating user
                    const userSchema = new UserSchema({
                        last_name : req.body.last_name,
                        first_name : req.body.first_name,
                        dOB : req.body.dOB,
                        country : req.body.country,
                        email_adress : req.body.email_adress,
                        password : hash
                    });
                    //Saving user
                    userSchema.save()
                    .then(() =>{
                        res.redirect('/login');
                    })
                    .catch((err) =>{
                        res.send('Woops, something went wrong, sorry');
                    });

                });
            });
        }
        
        else{
            res.render('register', {
                user: req.user,
                errors: errors.array(),
                data : req.body} )
        }
    });// EO ROUTER POST



//---------------------------------------------------
//              LOGIN
//---------------------------------------------------

router.get('/login', (req, res, next) =>{
    res.render('login',{
        user: req.user,
        wasRedirected : false
    });
});

router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
});

// Redirection route fos unauthenticated users, 
// will display a message
router.get('/login/forbidden', (req, res) =>{
    res.render('login', {
        user : req.user,
        wasRedirected : true
    });
})


//---------------------------------------------------
//              LOGOUT
//---------------------------------------------------

router.get('/logout', (req, res) =>{
    res.render('logout',{
        user: req.user,
    });
});

router.post('/logout', (req, res) =>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;