import { Request, Response } from "express"
import { signup } from "../../firebase/init"
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
  console.log("this reached here bro as well")
  const user_info: SignUpRequestInterface = req.body

  // check if email already exist
  AuthDB.check(user_info.email)

  // create user in firebase
  signup(user_info.email, user_info.password)
    .then((firebase_response: SignUpResponseInterface) => {
      // create user in db
      AuthDB.create({
        email: user_info.email,
        first_name: user_info.first_name,
        last_name: user_info.last_name,
        _id: firebase_response.user_id,
      } as IUser)
        .then((db_response: IUser) => {
          return res.status(HttpStatusCodes.CREATED).json(db_response)
        })
        .catch((error) => {
          const error_code = error.code || HttpStatusCodes.SERVER_ERROR
          return res.status(error_code).json(error)
        })
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}
