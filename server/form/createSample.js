const path = require('path');
const multer = require('multer'); //middleware for handling multipart/form-data
const sanitize = require("sanitize-filename");
const {mp4Filter} = require('../utils');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../static/audio'))
    },
    filename: (req, file, cb) => {
        console.log('sanitized filename', sanitize(file.originalname));
        cb(null, sanitize(file.originalname).replace(/\s/g, '_'))
    }
});

module.exports = multer({storage: storage, fileFilter: mp4Filter}).single('audioFile');