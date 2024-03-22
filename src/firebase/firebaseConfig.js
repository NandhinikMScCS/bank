// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import {getStorage } from "firebase/storage"// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfDj5uKlFWeJP7KZU5JgTvYv4wqvg1drU",
  authDomain: "bankingapp-15ebb.firebaseapp.com",
  projectId: "bankingapp-15ebb",
  storageBucket: "bankingapp-15ebb.appspot.com",
  messagingSenderId: "762468937595",
  appId: "1:762468937595:web:eaaa4da5c8bf5c2c7317de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app)