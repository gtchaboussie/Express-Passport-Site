const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({

    article_name:{
        type : String,
        trim : true,
    },
    article_description:{
        type : String,
        trim : true,
    }

});

module.exports = mongoose.model('ArticleSchema', articleSchema);