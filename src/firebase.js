import { initializeApp } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBB_7co2nbGc14Ft8zX5dLjClBCYWXtuMY",
  authDomain: "cases-6c1ce.firebaseapp.com",
  projectId: "cases-6c1ce",
  storageBucket: "cases-6c1ce.appspot.com",
  messagingSenderId: "1043831776937",
  appId: "1:1043831776937:web:c0e24094c8d7e0c0f4b3bb"
};

// Initialize Firebase
console.log('Initializing Firebase with config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '[KEY PRESENT]' : '[KEY MISSING]'
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app; 