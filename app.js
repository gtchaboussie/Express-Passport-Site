//===================================================
//              MODULES IMPORTS
//===================================================
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnection');
const favicon = require('express-favicon');

const passport= require('passport');

//mongoose models import
require('./models/UserSchema');
require('./models/ArticleSchema');

//===================================================
//              APP SETUP
//===================================================
const app = express();
const port = ( process.env.PORT || 3000 );
app.use(bodyParser.urlencoded({ extended: true }));

//serving static files
//app.use(express.static(__dirname+'public'));
app.use(express.static('public/'));
app.use(favicon(__dirname + '/public/favicon.png'));



//VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//EXPRESS-SESSION
const expressSession = require('express-session')({
    secret : process.env.SECRET || 'cat',
    resave : false,
    saveUninitialized : false,
});
app.use(expressSession);


//PASSPORT INIT
require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());


//ROUTES
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
app.use('/', usersRouter);
app.use('/', indexRouter);



//===================================================
//              APP START
//===================================================
const server = app.listen(port, () => {
    console.log(`.: --------------------------------:.`.bgGray.red);
    console.log(`.: Express is running on port ${server.address().port} :.`.bgWhite.red);
    console.log(`.: --------------------------------:.`.bgGray.red);
});