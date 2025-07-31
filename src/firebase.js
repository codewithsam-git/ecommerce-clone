import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGlTWG5VJlAavLtdnaGUxqHwp7R3stmOs",
  authDomain: "ecommerce-clone-dfe01.firebaseapp.com",
  projectId: "ecommerce-clone-dfe01",
  storageBucket: "ecommerce-clone-dfe01.firebasestorage.app",
  messagingSenderId: "1098971800123",
  appId: "1:1098971800123:web:f5832af2581f4a1929b21e",
  measurementId: "G-3DENESTY9T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
