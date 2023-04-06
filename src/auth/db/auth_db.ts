import { rejects } from "assert"
import { SignUpRequestInterface } from "../../types/auth/auth_types"
import User, { IUser } from "../model/auth_models"

/**
 * @function create
 * @description saves a new user to the database
 * @param {IUser} user
 * @returns {Promise<IUser>}
 */

const create = (user: IUser): Promise<IUser> => {
  const newUser = new User(user)
  return newUser.save()
}

/**
 * @function check
 * @description checks if a user exists in the database
 * @param {string | null} email
 * @param {string | null} user_id
 * @returns
 */

const check = (email: string | null, user_id: string | null) => {}

const AuthDB = { create, check }

export default AuthDB
