import { Request, Response } from "express"
import { User } from "../types/users"
import ProjectDB from "../db/project_db"
import { ICreateProjectRequest, IProjectInfo } from "../types/project"
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

export const getProjects = (req: Request, res: Response) => {
  const { limit = 4, page = 1 } = req.query
  const user: User = req.user
  ProjectDB.getProjects(Number(limit), Number(page), user.id)
    .then((projects: IProjectInfo[]) => {
      res.status(HttpStatusCode.OK).send({
        projects: projects,
      })
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}
