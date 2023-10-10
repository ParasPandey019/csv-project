const express = require('express');
const port = 8000;
const app = express();
const path = require('path');


//accesing static files from assets folder
app.use(express.static('./assets'));    

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port: ', port);

});