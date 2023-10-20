const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const csv = require('csv-parser');
const db = require("./config/mongoose");
const bodyParser = require('body-parser');


// setting layouts module
app.use(expressLayouts);


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

//accesing static files from assets folder
app.use(express.static('./assets'));    

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port: ', port);

});