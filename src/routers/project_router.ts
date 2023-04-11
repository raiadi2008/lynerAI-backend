import { Router } from "express"
import { verifyToken } from "../middleware/auth_middlewares"
import { createProject } from "../controllers/project_controller"
import { verifyCreateProjectRequestMiddleware } from "../middleware/project_middlewares"

const projectRouter = Router()

projectRouter.use(verifyToken)

projectRouter
  .route("/project")
  .post(verifyCreateProjectRequestMiddleware, createProject)

export default projectRouter
