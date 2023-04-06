import { AuthStatusEnum } from "../constants/auth_enums"

export interface SignInResponseInterface {
  access_token: string
  refresh_token: string
}

export interface SignUpResponseInterface {
  user_id?: string
  status: AuthStatusEnum
  reason?: string
}

export interface SignUpRequestInterface {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface SignInRequestInterface {
  email: string
  password: string
}

export interface AuthRejectionInterface {
  reason: string
  status: AuthStatusEnum
}
