// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWQa4gFOnIvbEmaTEVMK3KShtPcv3_aXo",
  authDomain: "netflix-clone-2a994.firebaseapp.com",
  projectId: "netflix-clone-2a994",
  storageBucket: "netflix-clone-2a994.appspot.com",
  messagingSenderId: "348987729961",
  appId: "1:348987729961:web:b81a2b07c21018c3645438",
  measurementId: "G-M16FXJ8QXQ"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }