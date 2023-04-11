import { Request, Response } from "express"
import { User } from "../types/users"
import ProjectDB from "../db/project_db"
import { ICreateProjectRequest } from "../types/project"
import { IProjectInterface, IProjectSections } from "../models/project_model"
import { HttpStatusCode } from "../constants/http_constants"

export const createProject = (req: Request, res: Response) => {
  const user: User = req.user
  const project: ICreateProjectRequest = req.body

  ProjectDB.create({
    project_name: project.project_name,
    project_description: project.project_description,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user.id,
    project_sections: [] as IProjectSections[],
    default_text: [] as string[],
  } as IProjectInterface)
    .then((project) => {
      res.status(HttpStatusCode.CREATED).send(project)
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}
