import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';  // Using full Firestore SDK

const firebaseConfig = {
  apiKey: "your-api-key",  // Add your actual Firebase API key here
  authDomain: "your-auth-domain",  // Add your actual auth domain here
  projectId: "your-project-id",  // Add your actual project ID here
  storageBucket: "your-storage-bucket",  // Add your actual storage bucket here
  messagingSenderId: "your-messaging-sender-id",  // Add your actual messaging sender ID here
  appId: "your-app-id"  // Add your actual app ID here
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);  // Using full Firestore SDK
export const storage = getStorage(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
