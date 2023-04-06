/**
 * SignUp Status Enum
 */

export enum AuthStatusEnum {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
}

export enum AuthStatusReasonEnum {
  EMAIL_ALREADY_EXISTS = "Email already exists",
  FAILED_TO_CREATE_USER = "Failed to create user",
  FAILED_TO_LOGIN = "Failed to login",
  FAILED_TO_SEND_EMAIL_VERIFICATION = "Failed to send email verification",
  FAILED_TO_SEND_PASSWORD_RESET_EMAIL = "Failed to send password reset email",
  FAILED_TO_RESET_PASSWORD = "Failed to reset password",
  FAILED_TO_UPDATE_PASSWORD = "Failed to update password",
  FAILED_TO_UPDATE_EMAIL = "Failed to update email",
  FAILED_TO_UPDATE_PROFILE = "Failed to update profile",
  FAILED_TO_SIGN_OUT = "Failed to sign out",
  FAILED_TO_DELETE_USER = "Failed to delete user",
  FAILED_TO_REAUTHENTICATE = "Failed to reauthenticate",
  FAILED_TO_GET_USER = "Failed to get user",
  FAILED_TO_GET_USER_PROFILE = "Failed to get user profile",
  EMAIL_NOT_VERIFIED = "Email not verified",
}
