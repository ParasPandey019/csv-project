const File = require("../models/csv");


module.exports.index = async function(req, res) {
    try {
        let file = await File.find({});
        return res.render('index', {
            files: file,
            title: "Index"
        });
    } catch (error) {
        console.log('Error in IndexController', error);
        return;
    }
}