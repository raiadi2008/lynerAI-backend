import * as admin from "firebase-admin"
import { DecodedIdToken, getAuth } from "firebase-admin/auth"

const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})
const firebaseAuth = getAuth(firebaseApp)

export const validateIdToken = (idToken: string): Promise<DecodedIdToken> => {
  return firebaseAuth.verifyIdToken(idToken)
}

export default firebaseApp
