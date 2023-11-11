import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import "../app.css";

export const firebaseConfig = {
    apiKey: "AIzaSyDriGlcD-5iSpKyTCQ3eweM8Wfgs0c9RZw",
    authDomain: "kabloop-5462c.firebaseapp.com",
    projectId: "kabloop-5462c",
    storageBucket: "kabloop-5462c.appspot.com",
    messagingSenderId: "474590737541",
    appId: "1:474590737541:web:403566bee95bc02060e5ec"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

