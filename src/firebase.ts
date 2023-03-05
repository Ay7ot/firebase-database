// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpraqVRoxwNBHhxL8RHbqdUDUNPuZq5k8",
  authDomain: "fir-database-f2038.firebaseapp.com",
  projectId: "fir-database-f2038",
  storageBucket: "fir-database-f2038.appspot.com",
  messagingSenderId: "355945083232",
  appId: "1:355945083232:web:ffa1a67407f6584d906e05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)

export default app
export { db, auth }