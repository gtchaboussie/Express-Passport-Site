//===================================================
//              IMPORTS
//===================================================
const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const checkAuthentication = require('../config/check_auth');
const operations = require('../services/articles_operations')
const { check, validationResult } = require('express-validator');
const sendMail = require('../services/send_mail');

//---------------------------------------------------
//              ERROR CALLBACK DEFINITION
//---------------------------------------------------
const resErr = (err) =>{
    res.render('error',{
        user : req.body,
        error : err
    });
}

//===================================================
//            BASIC  ROUTES
//===================================================

//Welcome page
router.get('/', (req, res)=>{
    res.render('index',{
        user: req.user,
    });
});

//---------------------------------------------------
//              MAIL SENDING
//---------------------------------------------------

router.get('/contact',checkAuthentication, (req, res) =>{
    res.render('contact',{
        user: req.user,
        errors : null
    })
});

router.post('/contact', checkAuthentication,
[ //Validation chain
    check('name')
        .isLength({min : 1}).withMessage("Please enter a name")
        .trim(),
    check('object')
        .isLength({min : 1}).withMessage("Please enter an object")
        .trim(),
    check('message')
        .isLength({min : 10, max : 500}).withMessage("Please enter a valid message")
],
(req, res) =>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        sendMail(req.body);
        res.redirect('/articles');
    }
    else{
        res.render('contact',{
            user: req.user,
            errors: errors.array()
        });
    }

});
    

//===================================================
//              ARTICLE SECTION
//===================================================

//List of all articles, READ ONLY
router.get('/articles',  (req, res) =>{

    const resToSend = function(err, docs){
        res.render('articles_index', {
            articles : docs,
            user : req.user,
        });
    }
    operations.list(resToSend, resErr);
});

//---------------------------------------------------
//              ARTICLE CREATE
//---------------------------------------------------

router.get('/article/add', checkAuthentication, (req, res) =>{
    res.render('article_add',{
        user: req.user,
        errors : null,
        data : null });
});


router.post('/article/add', checkAuthentication,
    [ //Validation chain
        check('article_name')
            .isLength({min : 1}).withMessage("Please enter an article name")
            .trim(),
        check('article_description')
            .isLength({min : 1}).withMessage("Please enter an article description")
            .trim()
    ],
    (req, res) =>{
        const errors = validationResult(req);
        if(errors.isEmpty()){
            operations.create( req.body );
            res.redirect('/articles');
        }
        else{
            res.render('article_add',{
                user: req.user,
                errors: errors.array(),
                data : req.body});
        }
    
});

//---------------------------------------------------
//              ARTICLE EDIT
//---------------------------------------------------

router.get('/article/edit/:_id', checkAuthentication, (req, res) =>{
    const id = req.params._id;
    const resToSend = (err, document) =>{
        res.render('article_edit', {
        user: req.user,
        article : document,
        errors : null
        });
    };
    operations.get(id, resToSend );
});


router.post('/article/edit/:_id', checkAuthentication,
    [ //Validation chain
        check('article_name')
            .isLength({min : 1}).withMessage("Please enter an article name")
            .trim(),
        check('article_description')
            .isLength({min : 1}).withMessage("Please enter an article description")
            .trim()
    ],
    (req, res) =>{
        const id = req.params._id;
        const errors = validationResult(req);
        if(errors.isEmpty()){
            operations.update( id, req.body );
            res.redirect('/articles');
        }
        else{
            res.render('article_add',{
                user: req.user,
                errors: errors.array(),
                data : req.body});
        }
});

//---------------------------------------------------
//              ARTICLE DELETE
//---------------------------------------------------

router.get('/article/delete/:_id', checkAuthentication, (req, res) =>{
    const id = req.params._id;

    const resToSend = (err, document) =>{
        res.render('article_delete', {
        user: req.user,
        article : document,
        errors : null
        });
    };
    operations.get(id, resToSend );
});

router.post('/article/delete/:_id', checkAuthentication, (req, res) =>{
    const id = req.params._id;

    operations.delete( id );

    res.redirect('/articles');
});

module.exports = router;