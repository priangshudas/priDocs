// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

//add your firebase config file details from firebase console
// https://firebase.google.com/docs/web/setup#config-object
//--change start here--
const firebaseConfig = {
  apiKey: "AIzaSyCMXLH1zrlAGwaqCvYcKWbi4CfuVl2zfSc",
  authDomain: "pri-docs.firebaseapp.com",
  projectId: "pri-docs",
  storageBucket: "pri-docs.firebasestorage.app",
  messagingSenderId: "350345140346",
  appId: "1:350345140346:web:9b87397caa22871c4903c3",
  measurementId: "G-DJT6JCZ1GC"
};
//--change end here--

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    // Optional: Initialize Firebase Analytics

const auth = getAuth(app);// Initialize Firebase Authentication and get a reference to the service
const provider = new GoogleAuthProvider();// Create a new instance of the Google provider object
provider.addScope("https://www.googleapis.com/auth/drive.appfolder");//It will allow the app to access the user's Google Drive app folder   

const db = getFirestore(app);// Initialize Firestore to store and retrieve documents

export{auth, provider, db, app, analytics};// Export the auth, provider, db, app, and analytics objects for use in other parts of your application