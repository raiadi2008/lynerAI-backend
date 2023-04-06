import { Router } from "express"
import { signupController } from "../controllers/auth_controller"

const authRouter: Router = Router()

authRouter.post("/signup", signupController)

export default authRouter
