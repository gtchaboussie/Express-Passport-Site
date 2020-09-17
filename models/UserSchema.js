const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    last_name:{
        type : String,
        trim : true,
    },
	first_name: {
    	type: String,
    	trim: true,
    },
    dOB :{
        type : Date
    },
    country :{
        type : String
    },
    email_adress:{
        type: String,
        trim: true
    },
    password:{
        type : String,
    }
});

module.exports = mongoose.model('UserSchema', userSchema);
