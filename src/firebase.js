import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Basic config for local development
const firebaseConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-app.firebaseapp.com',
  projectId: 'demo-app',
  storageBucket: 'demo-app.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:123456789'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Always connect to emulators in development
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
connectFirestoreEmulator(db, '127.0.0.1', 8080);

// Helper function to create initial admin user
export const createInitialAdminUser = async () => {
  try {
    await signInWithEmailAndPassword(auth, 'admin@cases.com', 'Admin123!');
  } catch (error) {
    console.log('Initial login failed, creating admin user...');
  }
};

// Call this function when app starts
createInitialAdminUser();

export { auth, db };
export default app; 