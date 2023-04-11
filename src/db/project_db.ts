import Project, { IProjectInterface } from "../models/project_model"

const create = (project: IProjectInterface): Promise<IProjectInterface> => {
  const newProject = new Project(project)
  return newProject.save()
}

const ProjectDB = {
  create,
}

export default ProjectDB
