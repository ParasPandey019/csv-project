const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect('mongodb://127.0.0.1:27017/csvProject');
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'error connecting to db'));
db.once('open', function(){
    console.log('successfully connected to databse');
})

module.exports = db;