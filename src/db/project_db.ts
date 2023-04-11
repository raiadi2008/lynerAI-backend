import Project, { IProjectInterface } from "../models/project_model"
import { IProjectInfo, IProjectList } from "../types/project"

const create = (project: IProjectInterface): Promise<IProjectInterface> => {
  const newProject = new Project(project)
  return newProject.save()
}

const getProjects = async (
  limit: number,
  page: number,
  user_id: string
): Promise<IProjectInfo[]> => {
  const projects = await Project.find({
    created_by: user_id,
  })
    .select("project_name project_description created_at created_by")
    .limit(limit)
    .skip((page - 1) * limit)
    .lean(true)
    .exec()

  const projectList: IProjectInfo[] = []

  projects.forEach((project) => {
    projectList.push({
      project_name: project.project_name,
      project_description: project.project_description,
      created_at: project.created_at,
      created_by: project.created_by,
    } as IProjectInfo)
  })

  return projectList
}

const ProjectDB = {
  create,
  getProjects,
}

export default ProjectDB
