import { Router } from "express"
import { verifyToken } from "../middleware/auth_middlewares"
import { createProject, getProjects } from "../controllers/project_controller"
import { verifyCreateProjectRequestMiddleware } from "../middleware/project_middlewares"

const projectRouter = Router()

projectRouter.use(verifyToken)

projectRouter
  .route("/project")
  .post(verifyCreateProjectRequestMiddleware, createProject)

projectRouter.route("/projects").get(getProjects)

export default projectRouter
