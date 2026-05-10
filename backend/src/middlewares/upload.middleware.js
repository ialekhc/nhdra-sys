const { upload } = require('../config/upload');

const uploadLabReport = upload.single('report');

module.exports = { uploadLabReport };
