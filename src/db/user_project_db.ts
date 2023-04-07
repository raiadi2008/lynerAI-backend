import UserProject, { IUserProject } from "../models/user_project_models"

/**
 * @function create
 * @description saves a new userProject to the database
 * @param {IUserProject} userProject
 * @returns {Promise<IUserProject>}
 */

const create = (userProject: IUserProject): Promise<IUserProject> => {
  const newUserProject = new UserProject(userProject)
  return newUserProject.save()
}

const UserProjectDB = { create }

export default UserProjectDB
