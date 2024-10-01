const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAskDl18I00ZgF-Sot-RhV1D3OomkHlWI8",
  authDomain: "to-do-app-f81a4.firebaseapp.com",
  projectId: "to-do-app-f81a4",
  storageBucket: "to-do-app-f81a4.appspot.com",
  messagingSenderId: "193002662909",
  appId: "1:193002662909:web:1a20ffedf04d36ab184794",
  measurementId: "G-XPHZGLNHXW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
