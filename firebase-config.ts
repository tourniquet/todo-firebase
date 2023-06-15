import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'todo-firebase-f4e09.firebaseapp.com',
  projectId: 'todo-firebase-f4e09',
  storageBucket: 'todo-firebase-f4e09.appspot.com',
  messagingSenderId: '917001262029',
  appId: '1:917001262029:web:8880a4d4cfdb754d686a84'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
