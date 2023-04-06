import { Router } from "express"
import {
  signinController,
  signupController,
} from "../controllers/auth_controller"
import AuthMiddlewares from "../middlewares/auth_middleware"

const authRouter: Router = Router()

authRouter.post(
  "/signup",
  AuthMiddlewares.validateSignupRequest,
  AuthMiddlewares.validateEmail,
  AuthMiddlewares.checkEmailExists,
  signupController
)
authRouter.post(
  "/login",
  AuthMiddlewares.validateSigninRequest,
  signinController
)

export default authRouter
