const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { env } = require('./env');
const ApiError = require('../utils/ApiError');

const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const maxFileSize = 5 * 1024 * 1024;
const backendRoot = path.resolve(__dirname, '..', '..');
const uploadPath = path.join(backendRoot, env.UPLOAD_DIR, 'lab-reports');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new ApiError(400, 'Invalid file type. Only PDF, JPG, JPEG, PNG are allowed.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxFileSize },
});

module.exports = { upload };
