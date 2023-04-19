import { Router } from "express"
import { verifyToken } from "../middleware/auth_middlewares.js"
import {
  addTextToProject,
  createProject,
  createProjectSection,
  deleteProjectSection,
  deleteTexts,
  getProjectById,
  getProjects,
  updateProjectSection,
} from "../controllers/project_controller.js"
import { verifyCreateProjectRequestMiddleware } from "../middleware/project_middlewares.js"

const projectRouter = Router()

// router middlewares
projectRouter.use(verifyToken)

projectRouter
  .route("/project")
  .post(verifyCreateProjectRequestMiddleware, createProject)

projectRouter.route("/projects").get(getProjects)

projectRouter.route("/project/:id").get(getProjectById)

projectRouter
  .route("/project/:id/sections")
  .post(createProjectSection)
  .put(updateProjectSection)

projectRouter.route("/project/:id/:section_id").delete(deleteProjectSection)

projectRouter.route("/project/:id/texts").post(addTextToProject)

projectRouter.route("/project/:id/:text_id/:section_id?").delete(deleteTexts)


export default projectRouter
