import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWDBEpDh8Br_G7jgZMjRkNC5is9qKQBbQ",
  authDomain: "great-academyy.firebaseapp.com",
  projectId: "great-academyy",
  storageBucket: "great-academyy.firebasestorage.app",
  messagingSenderId: "945427332796",
  appId: "1:945427332796:web:f6134ecd72f11e87da9ab9",
  measurementId: "G-R5YLZTPMB8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 