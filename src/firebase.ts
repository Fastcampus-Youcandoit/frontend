import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATd-g_ewdT3RvUWAX6AfWlW8IhyFucReA",
  authDomain: "youcandoit-5efce.firebaseapp.com",
  projectId: "youcandoit-5efce",
  storageBucket: "youcandoit-5efce.appspot.com",
  messagingSenderId: "712097001016",
  appId: "1:712097001016:web:51f280a56e6355d9f600cd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
