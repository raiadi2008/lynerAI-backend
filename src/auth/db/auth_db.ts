import { rejects } from "assert"
import { SignUpRequestInterface } from "../types/auth_types"
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
 * @returns {Promise<IUser>}
 */

const check = (email?: string, user_id?: string): Promise<IUser | null> => {
  if (email) {
    return User.findOne({ email })
  } else {
    return User.findOne({ user_id })
  }
}

const AuthDB = { create, check }

export default AuthDB
