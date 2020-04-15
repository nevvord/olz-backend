
const multer = require('multer')

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || 'image/png' || 'image/jpeg') {
        cb(null, true);
    }
    cb(null, false);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.userID + new Date().valueOf() + '.' +file.mimetype.split('/')[1]);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1920 * 1080 * 2
    },
    fileFilter: fileFilter
})

module.exports = upload