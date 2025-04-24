const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

cloudinary.config({
  cloud_name: "ddq8u316j",
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const base64String = file.buffer.toString('base64');
  const dataUri = `data:${file.mimetype};base64,${base64String}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: 'auto',
  });

  return result;
}


const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
