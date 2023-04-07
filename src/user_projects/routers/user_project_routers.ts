import { Router } from "express"
import {
  createProjectController,
  getProjectController,
  updateProjectController,
} from "../controllers/user_project_controllers"

const userProjectRouter: Router = Router()

userProjectRouter
  .route("/user_project")
  .post(createProjectController)
  .get(getProjectController)

userProjectRouter
  .route("/user_project/:id")
  .get(getProjectController)
  .put(updateProjectController)

export default userProjectRouter
