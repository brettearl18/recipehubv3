import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAb6uxhj0PvEjwG88Lo3Q_zbgD-TMyjiAw",
  authDomain: "recipehub-6489c.firebaseapp.com",
  projectId: "recipehub-6489c",
  storageBucket: "recipehub-6489c.firebasestorage.app",
  messagingSenderId: "407499850274",
  appId: "1:407499850274:web:b24b6c817afa49115c807b",
  measurementId: "G-4S9R709BFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app; 