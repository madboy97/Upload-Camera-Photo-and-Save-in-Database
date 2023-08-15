// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLYZs_PspPJJXHba5Pq0Xpb5SOMh1sZUo",
  authDomain: "camera-7706d.firebaseapp.com",
  projectId: "camera-7706d",
  storageBucket: "camera-7706d.appspot.com",
  messagingSenderId: "913532689424",
  appId: "1:913532689424:web:23db4c4de0a4ddb6103e95",
  measurementId: "G-2MLB4F5VDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);
export {db};