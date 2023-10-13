import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF0bEH8pyTGHOdbL7p3LOV6p2QyXtT_r0",
  authDomain: "fir-login-cbf3a.firebaseapp.com",
  projectId: "fir-login-cbf3a",
  storageBucket: "fir-login-cbf3a.appspot.com",
  messagingSenderId: "156570217712",
  appId: "1:156570217712:web:16f7b5da310d9e9fe1e635",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
