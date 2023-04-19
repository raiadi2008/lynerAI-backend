import {
  HttpStatusCode,
  HttpStatusMessage,
} from "../constants/http_constants.js"
import { validateIdToken } from "../firebase/init.js"

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(HttpStatusCode.UNAUTORIZED)
      .send(HttpStatusMessage.UNAUTORIZED)
  }

  const token = authHeader.split(" ")[1]
  validateIdToken(token)
    .then((decodedToken) => {
      req.user = {
        id: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      }
      next()
    })
    .catch((error) => {
      return res
        .status(HttpStatusCode.UNAUTORIZED)
        .send(HttpStatusMessage.UNAUTORIZED)
    })
}
