import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { AuthErrorCodes } from "firebase/auth"

import { SignUpResponseInterface } from "../auth/types/auth_types"
import { SignUpStatusEnum } from "../auth/constants/auth_enums"

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
        console.log("type of error", typeof error)
        console.log("error", error)
        const errorCode = error.code
        if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
          // todo: if fails here raise an alarm
          reject({
            reason: "Email already exists",
            status: SignUpStatusEnum.FAILURE,
          })
        }
        reject({
          reason: "Failed to create user",
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
