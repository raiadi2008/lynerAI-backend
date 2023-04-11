import { Router } from "express"
import { verifyToken } from "../middleware/auth_middlewares"
import { createProject } from "../controllers/project_controller"

const projectRouter = Router()

projectRouter.use(verifyToken)

projectRouter.route("/project").post(createProject)

export default projectRouter
