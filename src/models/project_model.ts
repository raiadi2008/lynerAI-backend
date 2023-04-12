import mongoose, { Schema, Model, Types, Document } from "mongoose"

interface IProjectSections {
  _id: Types.ObjectId
  section_title: string
  section_texts: Types.Array<Types.ObjectId>
}

interface IProjectTexts {
  _id: Types.ObjectId
  text: string
}
interface IProject {
  _id: Types.ObjectId
  project_name: string
  project_description: string
  created_by: string // uid of use who created the project
  created_at: Date
  updated_at: Date
  project_sections: Types.DocumentArray<IProjectSections>
  project_text: Types.DocumentArray<IProjectTexts>
}

const ProjectSectionsSchema = new Schema<
  IProjectSections,
  Model<IProjectSections>
>({
  section_title: { type: String, required: true },
  section_texts: [Types.ObjectId],
})

const ProjectTextSchema = new Schema<IProjectTexts, Model<IProjectTexts>>({
  text: { type: String, required: true },
})

const ProjectSchema = new Schema<IProject, Model<IProject>>({
  project_name: { type: String, required: true },
  project_description: { type: String, required: true },
  created_by: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  project_sections: [
    {
      section_title: { type: String, required: true },
      section_texts: [Types.ObjectId],
    },
  ],
  project_text: [
    {
      text: { type: String, required: true },
    },
  ],
})

const Project = mongoose.model("Project", ProjectSchema)

// to use when we want to return
// functions of document
type TProject = Document & IProject
type TProjectSections = Document & IProjectSections
type TProjectTexts = Document & IProjectTexts

export default Project
export {
  IProject,
  IProjectSections,
  IProjectTexts,
  ProjectSectionsSchema,
  ProjectTextSchema,
  ProjectSchema,
  TProject,
  TProjectSections,
  TProjectTexts,
}
