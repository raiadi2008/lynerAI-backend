import { Request, Response } from "express"
import { login, sendVerificationEmail, signup } from "../../firebase/init"
import {
  SignUpRequestInterface,
  SignUpResponseInterface,
} from "../types/auth_types"
import AuthDB from "../db/auth_db"
import { IUser } from "../model/auth_models"
import { HttpStatusCodes } from "../../global_constants/constants"

/**
 * @function signupController
 * @description handles the signup process
 * @param req
 * @param res
 */

export const signupController = (req: Request, res: Response) => {
  const user_info: SignUpRequestInterface = req.body

  // create user in firebase
  signup(user_info.email, user_info.password)
    .then((firebase_response: SignUpResponseInterface) => {
      // create user in db
      return AuthDB.create({
        email: user_info.email,
        first_name: user_info.first_name,
        last_name: user_info.last_name,
        _id: firebase_response.user_id,
      } as IUser)
    })
    .then((db_response: IUser) => {
      res.status(HttpStatusCodes.CREATED).json(db_response)
      return sendVerificationEmail()
        .then((email_response) => {
          console.log("email sent")
        })
        .catch((error) => {
          console.log("email not sent")
        })
    })
    .catch((error) => {
      const error_code = error.code || HttpStatusCodes.SERVER_ERROR
      return res.status(error_code).json(error)
    })
}

export const signinController = (req: Request, res: Response) => {
  login(req.body.email, req.body.password)
    .then((response) => {
      res.status(HttpStatusCodes.OK).json(response)
    })
    .catch((error) => {
      const error_code = error.code || HttpStatusCodes.SERVER_ERROR
      return res.status(error_code).json(error)
    })
}
