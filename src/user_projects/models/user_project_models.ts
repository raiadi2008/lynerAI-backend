import mongoose, { Model, Schema, Types } from "mongoose"
import { ProjectSectionType } from "../constants/user_project_enums"

/**
 * @interface IUserProject
 * @description Interface for project section
 */

interface ProjectSection {
  _id: Types.ObjectId
  name: string
  position: number
  data: Types.Array<string>
  type: ProjectSectionType
}

/**
 * @interface IUserProject
 * @description Interface for UserProject model that represents a document (userProject document) in mongodb
 */

interface IUserProject {
  project_name: string
  project_description: string
  created_at: Date
  updated_at: Date
  sections: Types.DocumentArray<ProjectSection>
}

/**
 * @schema UserProjectSchema
 * @description userProject schema corresponding to IUserProject interface
 */

const schema = new Schema<IUserProject, Model<IUserProject>>({
  project_name: { type: String, required: true },
  project_description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  sections: [
    {
      _id: { type: Types.ObjectId, auto: true },
      name: { type: String, required: true },
      position: { type: Number, required: true },
      data: { type: [String], required: true },
      type: { type: String, required: true },
    },
  ],
})

/**
 * @model UserProject
 * @description UserProject model that corresponds to UserProjectSchema
 */

const UserProject = mongoose.model<IUserProject>("UserProject", schema)

export default UserProject
export { IUserProject, ProjectSection }
