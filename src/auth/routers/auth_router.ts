import { Router } from "express"
import { signupController } from "../controllers/auth_controller"
import AuthMiddlewares from "../middlewares/auth_middleware"

const authRouter: Router = Router()

authRouter.post(
  "/signup",
  AuthMiddlewares.validateSignupRequest,
  AuthMiddlewares.validateEmail,
  AuthMiddlewares.checkEmailExists,
  signupController
)

export default authRouter
