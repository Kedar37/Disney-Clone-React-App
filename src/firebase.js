import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCrM7bQqZTFTH1neYIK9gtS2gccpCTOb0U",
  authDomain: "disney-clone-abaf5.firebaseapp.com",
  projectId: "disney-clone-abaf5",
  storageBucket: "disney-clone-abaf5.appspot.com",
  messagingSenderId: "775923473934",
  appId: "1:775923473934:web:7255a700fe03fd79a3265f",
  measurementId: "G-9FXHZLC4YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider, db};
