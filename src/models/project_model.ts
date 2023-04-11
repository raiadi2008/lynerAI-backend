import mongoose, { Schema, Model, Types } from "mongoose"

interface IProjectSections {
  _id: Types.ObjectId
  section_title: string
  section_texts: Types.Array<string>
}

interface IProjectInterface {
  project_name: string
  project_description: string
  created_by: string // uid of use who created the project
  created_at: Date
  updated_at: Date
  project_sections: Types.DocumentArray<IProjectSections>
  default_text: Types.Array<string>
}

const ProjectSchema = new Schema<IProjectInterface, Model<IProjectInterface>>({
  project_name: { type: String, required: true },
  project_description: { type: String, required: true },
  created_by: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  project_sections: [
    {
      section_title: { type: String, required: true },
      section_texts: [String],
    },
  ],
  default_text: [String],
})

const Project = mongoose.model("Project", ProjectSchema)

export default Project
export { IProjectInterface, IProjectSections }
