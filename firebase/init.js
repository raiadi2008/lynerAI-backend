import { initializeApp } from "firebase-admin/app";
import { applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth"

const firebaseApp = initializeApp({
  credential: applicationDefault()
})

export const firebaseAuth = getAuth(firebaseApp)
export const validateIdToken = (idToken) => {
  return firebaseAuth.verifyIdToken(idToken)
}

export default firebaseApp