import { Model } from "mongoose"
import Project, { IProject, TProject } from "../models/project_model"
import { IProjectInfo, IProjectList } from "../types/project"

const create = (project: IProject): Promise<IProject> => {
  const newProject = new Project(project)
  return newProject.save()
}

const save = async (project: TProject): Promise<TProject> => {
  project = await project.save()
  return project
}

const getProjects = async (
  limit: number,
  page: number,
  user_id: string
): Promise<IProjectInfo[]> => {
  const projects = await Project.find({
    created_by: user_id,
  })
    .select("_id project_name project_description created_at created_by")
    .limit(limit)
    .skip((page - 1) * limit)
    .lean(true)
    .exec()

  const projectList: IProjectInfo[] = []

  projects.forEach((project) => {
    projectList.push({
      _id: project._id.toString(),
      project_name: project.project_name,
      project_description: project.project_description,
      created_at: project.created_at,
      created_by: project.created_by,
    } as IProjectInfo)
  })

  return projectList
}

const getProjectById = async (
  id: string,
  user_id: string
): Promise<TProject | null> => {
  try {
    const project = await Project.findOne({
      _id: id,
      created_by: user_id,
    }).exec()
    return project
  } catch (error) {
    return null
  }
}

const ProjectDB = {
  create,
  save,
  getProjects,
  getProjectById,
}

export default ProjectDB
