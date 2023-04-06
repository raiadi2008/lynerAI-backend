import { Request, Response } from "express"
import { signup } from "../../firebase/init"
import {
  SignUpRequestInterface,
  SignUpResponseInterface,
} from "../../types/auth/auth_types"
import AuthDB from "../db/auth_db"
import { IUser } from "../model/auth_models"

/**
 * @function signupController
 * @description handles the signup process
 * @param req
 * @param res
 */

export const signupController = (req: Request, res: Response) => {
  const user_info: SignUpRequestInterface = req.body
  signup(user_info.email, user_info.password)
    .then((firebase_response: SignUpResponseInterface) => {
      AuthDB.create({
        email: user_info.email,
        first_name: user_info.first_name,
        last_name: user_info.last_name,
        user_id: firebase_response.user_id,
      } as IUser)
        .then((db_response: IUser) => {
          res.status(200).json(db_response)
        })
        .catch((error) => {
          res.status(400).json(error)
          console.log("got db error", error)
        })
    })
    .catch((error) => {
      res.status(400).json(error)
    })
}
