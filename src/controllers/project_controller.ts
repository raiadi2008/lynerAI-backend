import { Request, Response } from "express"
import { User } from "../types/users"
import ProjectDB from "../db/project_db"
import { ICreateProjectRequest, IProjectInfo } from "../types/project"
import {
  IProject,
  IProjectSections,
  IProjectTexts,
} from "../models/project_model"
import { HttpStatusCode, HttpStatusMessage } from "../constants/http_constants"

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
    project_text: [] as IProjectTexts[],
  } as IProject)
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

export const getProjectById = (req: Request, res: Response) => {
  const { id } = req.params
  const user: User = req.user
  ProjectDB.getProjectById(id, user.id)
    .then((project) => {
      if (project) res.status(HttpStatusCode.OK).send(project)
      else
        res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}

export const createProjectSection = (req: Request, res: Response) => {
  const { id } = req.params
  const user: User = req.user
  const {
    section_title,
    section_texts = [],
  }: { section_title: string; section_texts: string[] } = req.body

  ProjectDB.getProjectById(id, user.id).then((project) => {
    if (project) {
      project.project_sections.push({
        section_title: section_title,
        section_texts: section_texts,
      })
      ProjectDB.save(project)
        .then((project) => res.status(HttpStatusCode.OK).send(project))
        .catch((error) => {
          res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
        })
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
    }
  })
}

export const addTextToProject = (req: Request, res: Response) => {
  const { id } = req.params
  const user: User = req.user
  const { text }: { text: string } = req.body

  ProjectDB.getProjectById(id, user.id)
    .then((project) => {
      if (project) {
        project.project_text.push({
          text,
        })
        ProjectDB.save(project)
          .then((project) => res.status(HttpStatusCode.OK).send(project))
          .catch((error) =>
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
          )
      } else {
        res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
      }
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}
