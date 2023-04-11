import { Request, Response, NextFunction } from "express"
import { HttpStatusCode, HttpStatusMessage } from "../constants/http_constants"
import { User } from "../types/users"
import { validateIdToken } from "../firebase/init"

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      } as User
      next()
    })
    .catch((error) => {
      return res
        .status(HttpStatusCode.UNAUTORIZED)
        .send(HttpStatusMessage.UNAUTORIZED)
    })
}
