import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHZOmC4BvIxIehqpSfKsXhBJtH8-0_Ey0",
  authDomain: "cases-6c1ce.firebaseapp.com",
  projectId: "cases-6c1ce",
  storageBucket: "cases-6c1ce.appspot.com",
  messagingSenderId: "1043831776937",
  appId: "1:1043831776937:web:c0e24094c8d7e0c0f4b3bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable local persistence for Firestore
if (window.location.hostname === 'localhost') {
  console.log('Running in development mode');
  // You can add emulator connections here if needed
}

export { auth, db };
export default app; 