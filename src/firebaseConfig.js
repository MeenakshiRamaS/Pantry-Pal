// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDTlfDSf1udeMjXn61enG0dJf9vLdmhsGg",
  authDomain: "pantrypal-4fff9.firebaseapp.com",
  projectId: "pantrypal-4fff9",
  storageBucket: "pantrypal-4fff9.firebasestorage.app",
  messagingSenderId: "218127814407",
  appId: "1:218127814407:web:94543df99db41f16573fa2",
  measurementId: "G-8TQR316RCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

