import mongoose, { Schema } from "mongoose"

/**
 * @interface IUser
 * @description Interface for User model that represents a document (user document) in mongodb
 */
interface IUser {
  user_id: string
  email: string
  first_name: string
  last_name: string
}

/**
 * @schema UserSchema
 * @description user schema corresponding to IUser interface
 */
const UserSchema = new Schema<IUser>({
  user_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
})

/**
 * @model User
 * @description User model that corresponds to UserSchema
 */

const User = mongoose.model<IUser>("User", UserSchema)

export default User
export { IUser }
