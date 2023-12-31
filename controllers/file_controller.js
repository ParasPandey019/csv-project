const fs = require('fs');
const csvParser = require('csv-parser');
const CSV = require('../models/csv');
const path = require('path');


module.exports.upload = async function(req, res) {
    try {
        if(!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // checking file type on serverside
        if(req.file.mimetype != "text/csv") {
            return res.status(400).send('Select CSV files only.');
        }
        let file = await CSV.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            file: req.file.filename
        });
        return res.redirect('/');
    }catch (error) {
        console.log('Error in fileController/upload', error);
        res.status(500).send('Internal server error');
    }
}


module.exports.view = async function(req, res) {
    try {
        let csvFile = await CSV.findOne({file: req.params.id});
        const results = [];
        const header =[];
        fs.createReadStream(csvFile.filePath) 
        .pipe(csvParser())
        .on('headers', (headers) => {
            headers.map((head) => {
                header.push(head);
            });
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            res.render("viewer", {
                title: "File Viewer",
                fileName: csvFile.fileName,
                head: header,
                data: results,
                length: results.length
            });
        });


    } catch (error) {
        console.log('Error in fileController/view', error);
        res.status(500).send('Internal server error');
    }
}

module.exports.jsonData = async function(req, res) {
    try {
        let csvFile = await CSV.findOne({fileName: req.params.fileName});
        const results = [];
        fs.createReadStream(csvFile.filePath) 
        .pipe(csvParser({ separator: ',' }))
        .on('data', (data) =>
            results.push(data))
        .on('end', () => {
            res.json(results);
        });


    } catch (error) {
        console.log('Error in fileController/view', error);
        res.status(500).send('Internal server error');
    }
}

module.exports.delete = async function(req, res) {
    try {
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){
            await CSV.deleteOne({file: req.params.id});  
            const filePath = isFile.filePath;

            // Use fs.unlink to delete the file.
            fs.unlink(filePath, (err) => {
                if (err) {
                console.error('Error deleting the file:', err);
                res.status(500).send('Error deleting the file');
                }
            });          
            return res.redirect("/");
        }else{
            console.log("File not found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}