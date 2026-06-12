import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB7HBasfONQh71YucCS6Tfw1AIWWViKNe0",
  authDomain: "campulung-film-fest.firebaseapp.com",
  projectId: "campulung-film-fest",
  storageBucket: "campulung-film-fest.firebasestorage.app",
  messagingSenderId: "667563194663",
  appId: "1:667563194663:web:8f79ff8426abf7e2191102"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)