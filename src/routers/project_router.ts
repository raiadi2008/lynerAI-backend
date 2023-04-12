import { Router } from "express"
import { verifyToken } from "../middleware/auth_middlewares"
import {
  addTextToProject,
  createProject,
  createProjectSection,
  getProjectById,
  getProjects,
} from "../controllers/project_controller"
import { verifyCreateProjectRequestMiddleware } from "../middleware/project_middlewares"

const projectRouter = Router()

// router middlewares
projectRouter.use(verifyToken)

projectRouter
  .route("/project")
  .post(verifyCreateProjectRequestMiddleware, createProject)

projectRouter.route("/projects").get(getProjects)

projectRouter.route("/project/:id").get(getProjectById)

// ----

projectRouter.route("/project/:id/sections").post(createProjectSection)

projectRouter.route("/project/:id/texts").post(addTextToProject)

export default projectRouter
