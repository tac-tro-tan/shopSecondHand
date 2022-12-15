// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRaHOGy9MjKtT-Mw4HUrRC0tLMLW-I4u8",
  authDomain: "muabandocu-e4e4b.firebaseapp.com",
  projectId: "muabandocu",
  storageBucket: "muabandocu.appspot.com",
  messagingSenderId: "832448995924",
  appId: "1:832448995924:web:9f7e2d08f3b9b35e8a43c1",
  measurementId: "G-RY1DNC3S0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}