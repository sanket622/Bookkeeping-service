const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-project-id.appspot.com"
});

const bucket = admin.storage().bucket();

const uploadToFirebase = async (file) => {
  const blob = bucket.file(Date.now() + '-' + file.originalname);
  const blobStream = blob.createWriteStream({ resumable: false });

  return new Promise((resolve, reject) => {
    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    }).on('error', reject).end(file.buffer);
  });
};

module.exports = { uploadToFirebase };
