// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider,EmailAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDamYBYAvNXgi-RR8KZGl2KhgF0P6Utx3M",
//   authDomain: "vitverse-2ba22.firebaseapp.com",
//   projectId: "vitverse-2ba22",
//   storageBucket: "vitverse-2ba22.appspot.com",
//   messagingSenderId: "613366272953",
//   appId: "1:613366272953:web:800c3a1e10b0b5436a9c68",
//   measurementId: "G-N3NB2J4RQ8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// const auth = getAuth();
// const googleProvider = new GoogleAuthProvider();
// const emailProvider = new EmailAuthProvider();

// export { auth, googleProvider,emailProvider};




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp, collection, getDocs } from "firebase/firestore"; // Make sure to import collection and getDocs

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDamYBYAvNXgi-RR8KZGl2KhgF0P6Utx3M",
  authDomain: "vitverse-2ba22.firebaseapp.com",
  projectId: "vitverse-2ba22",
  storageBucket: "vitverse-2ba22.appspot.com",
  messagingSenderId: "613366272953",
  appId: "1:613366272953:web:800c3a1e10b0b5436a9c68",
  measurementId: "G-N3NB2J4RQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();

export { auth, googleProvider, emailProvider, db, doc, setDoc, serverTimestamp, collection, getDocs }; // Make sure to export collection and getDocs

