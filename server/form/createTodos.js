const path = require('path');
const multer = require('multer'); //middleware for handling multipart/form-data
const sanitize = require("sanitize-filename");
const {pdfFilter} = require('../utils');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../static'))
    },
    filename: (req, file, cb) => {
        console.log('sanitized filename', sanitize(file.originalname));
        cb(null, sanitize(file.originalname).replace(/\s/g, '_'))
    }
});

module.exports = multer({storage: storage, fileFilter: pdfFilter}).single('filePath');
