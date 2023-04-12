export interface ICreateProjectRequest {
  project_name: string
  project_description: string
}

export interface IProjectInfo {
  _id: string
  project_name: string
  project_description: string
  created_at: Date
  created_by: string
}
export interface IProjectList {
  projects: [IProjectInfo]
}
