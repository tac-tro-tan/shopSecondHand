import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyBRaHOGy9MjKtT-Mw4HUrRC0tLMLW-I4u8",
    authDomain: "muabandocu-e4e4b.firebaseapp.com",
    projectId: "muabandocu",
    storageBucket: "muabandocu.appspot.com",
    messagingSenderId: "832448995924",
    appId: "1:832448995924:web:9f7e2d08f3b9b35e8a43c1",
    measurementId: "G-RY1DNC3S0G"
});
 
// Firebase storage reference
const Sstorage = getStorage(app);
export default Sstorage;