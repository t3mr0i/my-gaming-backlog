import * as firebase from "firebase/app";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDahvjrOj4gDDL0cpWOhYI8iKlZBEgFeSE",
  authDomain: "videogamerecommendator.firebaseapp.com",
  projectId: "videogamerecommendator",
  storageBucket: "videogamerecommendator.appspot.com",
  messagingSenderId: "413390326012",
  appId: "1:413390326012:web:27b7b4b7b71a183c5def79",
  measurementId: "G-ZM7Q48Q0BW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app); // get the firestore instance from the app

const handleSubmit = async (e) => {
  e.preventDefault();
  const success = await auth.createUserWithEmailAndPassword(email, password);
  if (success) {
    onClose();
  } else {
    setError("Error registering user");
  }
};
export { handleSubmit, db, auth };
