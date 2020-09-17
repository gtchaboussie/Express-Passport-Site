const ArticleSchema = require("../models/ArticleSchema");

const operations = {

    list : function ( resToSend, resErr )  {
        ArticleSchema.find({})
            .sort({article_name : 1 })
            .exec(( err, docs) =>{
                if(err) resErr(err);
                resToSend(null, docs);
            });
    },

    get : function( id, resToSend, resErr ){
        ArticleSchema.findById(id)
        .exec(( err, doc) =>{
            if(err) resErr(err);
            resToSend(null, doc);
        });
    },


    create : function ( requestBody ){
        const newArticle = new ArticleSchema({
            article_name : requestBody.article_name,
            article_description : requestBody.article_description
        });
        newArticle.save( (err)=>{
        });
    },


    update : async function( id, requestBody ){
        const filter = { _id : id};
        const update = { article_name : requestBody.article_name,
            article_description : requestBody.article_description};

        let doc = await ArticleSchema.findOneAndUpdate(filter, update);
    },

    delete : function ( id ){
        ArticleSchema.deleteOne({_id : id}, (err)=>{
            if(err) resErr(err);
            console.log("Deletion succeded");
        });
    }


};

module.exports = operations;