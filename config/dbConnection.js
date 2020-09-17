const mongoose = require('mongoose');
const dbPath = ( process.env.DATABASE || 'mongodb://localhost:27017/projet-ecf');

//---------------------------------------------------

let dbConnect = mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('-: Mongoose connection open :-');
    })
    .on('error', (err) => {
      console.log(`-: Connection error: ${err.message} :-`);
    });

mongoose.set('useFindAndModify', false);

module.exports = dbConnect;