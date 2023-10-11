const express = require('express');
const router = express.Router();
const multer = require('multer');


const homeController = require('../controllers/home_controller');
const fileController = require('../controllers/file_controller');
const upload = multer({ dest: 'uploads/files'})


router.get('/', homeController.index);
router.post('/upload', upload.single('file') ,fileController.upload);
router.get('/view/:id', fileController.view);
router.get('/delete/:id', fileController.delete);
router.get('/data/:fileName', fileController.jsonData);


module.exports = router;
