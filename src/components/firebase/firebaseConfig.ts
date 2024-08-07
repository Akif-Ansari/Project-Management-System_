import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSWlktkcfBDGtpEO_qWt86odtNZoWnT5s",
  authDomain: "project-management-a95ba.firebaseapp.com",
  projectId: "project-management-a95ba",
  storageBucket: "project-management-a95ba.appspot.com",
  messagingSenderId: "128210499242",
  appId: "1:128210499242:web:f3081a52681db7828e42d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, app, db };
