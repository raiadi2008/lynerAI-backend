import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"

import { SignUpResponseInterface } from "../types/auth/auth_types"
import { SignUpStatusEnum } from "../types/auth/auth_enums"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const fireabseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(fireabseApp)

const signup = (
  email: string,
  password: string
): Promise<SignUpResponseInterface> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        resolve({
          user_id: user.uid,
          status: SignUpStatusEnum.SUCCESS,
        })
      })

      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        reject({
          user_id: null,
          status: SignUpStatusEnum.FAILURE,
        })
      })
  })
}

const sendVerificationEmail = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!firebaseAuth.currentUser) {
      reject(false)
    } else {
      sendEmailVerification(firebaseAuth.currentUser)
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(false)
        })
    }
  })
}

const login = (email: string, password: string) => {}

export { signup, sendEmailVerification, login }