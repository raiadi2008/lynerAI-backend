import { Model } from "mongoose"
import Project from "../models/project_model.js"


const create = (project) => {
  const newProject = new Project(project)
  return newProject.save()
}

const save = async (project) => {
  project = await project.save()
  return project
}

const getProjects = async (
  limit,
  page,
  user_id
) => {
  const projects = await Project.find({
    created_by: user_id,
  })
    .select("_id project_name project_description created_at created_by")
    .limit(limit)
    .skip((page - 1) * limit)
    .lean(true)
    .exec()

  const projectList = []

  projects.forEach((project) => {
    projectList.push({
      _id: project._id.toString(),
      project_name: project.project_name,
      project_description: project.project_description,
      created_at: project.created_at,
      created_by: project.created_by,
    })
  })

  return projectList
}

const getProjectById = async (id, user_id) => {
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
