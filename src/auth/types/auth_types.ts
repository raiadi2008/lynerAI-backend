import { SignUpStatusEnum } from "../constants/auth_enums"

export interface SignInResponseInterface {
  access_token: string
  refresh_token: string
}

export interface SignUpResponseInterface {
  user_id?: string
  status: SignUpStatusEnum
  reason?: string
}

export interface SignUpRequestInterface {
  email: string
  password: string
  first_name: string
  last_name: string
}
