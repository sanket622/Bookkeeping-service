const admin = require('firebase-admin');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Resolve the full path from the environment variable
const serviceAccountPath = path.resolve(__dirname, '..', process.env.FIREBASE_CONFIG);
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bookkeeping-95403.appspot.com",
});

const bucket = admin.storage().bucket();

// Upload function
const uploadToFirebase = async (file) => {
  const fileName = `books/${uuidv4()}${path.extname(file.originalname)}`;
  const fileRef = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      },
      resumable: false,
    });

    stream.on('error', (err) => reject(err));
    stream.on('finish', () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
      resolve(publicUrl);
    });

    stream.end(file.buffer);
  });
};

module.exports = { uploadToFirebase };
