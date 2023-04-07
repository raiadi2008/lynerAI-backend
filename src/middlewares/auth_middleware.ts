import { Request, Response, NextFunction } from "express"
import EmailValidator from "email-validator"
import {
  HttpReasonPhrases,
  HttpStatusCodes,
} from "../constants/global_constants"
import AuthDB from "../db/auth_db"
import {
  SignInRequestInterface,
  SignUpRequestInterface,
} from "../types/auth_types"

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  if (!EmailValidator.validate(email)) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Invalid email" })
  } else {
    next()
  }
}

const checkEmailExists = (req: Request, res: Response, next: NextFunction) => {
  AuthDB.check(req.body.email)
    .then((user) => {
      if (user)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: "Email already exists" })
      else next()
    })
    .catch((err) => {
      return res
        .status(HttpStatusCodes.SERVER_ERROR)
        .json({ error: HttpReasonPhrases.SERVER_ERROR })
    })
}

const validateSignupRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, first_name, last_name } =
    req.body as SignUpRequestInterface

  if (!email || !password || !first_name || !last_name) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Missing required parameters" })
  } else next()
}

const validateSigninRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as SignInRequestInterface

  if (!email || !password) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Missing required parameters" })
  } else next()
}

const AuthMiddlewares = {
  validateEmail,
  checkEmailExists,
  validateSignupRequest,
  validateSigninRequest,
}

export default AuthMiddlewares
