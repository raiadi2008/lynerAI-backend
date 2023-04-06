import { SignUpStatusEnum } from "./auth_enums"

/**
 * @interface SignInResponseInteface
 */

export interface SignInResponseInterface {
  access_token: string
  refresh_token: string
}

/**
 * @interface SignUpResponseInterface
 */

export interface SignUpResponseInterface {
  user_id: string
  status: SignUpStatusEnum
}

/**
 * @interface SignUpRequestInterface
 */

export interface SignUpRequestInterface {
  email: string
  password: string
  first_name: string
  last_name: string
}
