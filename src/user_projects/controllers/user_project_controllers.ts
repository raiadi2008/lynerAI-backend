import { Request, Response } from "express"
import { CreateProjectRequestInterface } from "../types/user_project_types"
import UserProjectDB from "../db/user_project_db"
import { IUserProject, ProjectSection } from "../models/user_project_models"
import { ProjectSectionType } from "../constants/user_project_enums"

export const createProjectController = (req: Request, res: Response) => {
  const { project_name, project_description } =
    req.body as CreateProjectRequestInterface
  const created_at = new Date()
  const updated_at = new Date()
  const sections: ProjectSection[] = []
  const newUserProject: IUserProject = {
    created_at: created_at,
    updated_at: updated_at,
    project_description: project_description,
    project_name: project_name,
    sections: sections,
  } as IUserProject
  console.log("newUserProject", newUserProject)
  newUserProject.sections.push({
    name: ProjectSectionType.DEFAULT,
    position: Infinity,
    data: [],
    type: ProjectSectionType.DEFAULT,
  })
  UserProjectDB.create(newUserProject)
    .then((userProject) => {
      res.status(200).json(userProject)
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}
export const getProjectController = (req: Request, res: Response) => {}
export const updateProjectController = (req: Request, res: Response) => {}
