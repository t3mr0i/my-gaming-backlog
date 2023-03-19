import * as firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);

// Initialize auth and firestore
const auth = getAuth(app);
const db = getFirestore(app);

const handleSubmit = async (auth, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user: ", error);
    return null;
  }
};

export { handleSubmit, db, auth };
