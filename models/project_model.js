import mongoose, { Schema } from "mongoose"

const ProjectSectionSchema = new Schema({
  section_title: { type: String, required: [true, "section_title can't be empty"] },
  section_texts: [{ type: Schema.Types.ObjectId, ref: "ProjectText" }]
})

const ProjectTextSchema = new Schema({
  text: { type: String, required: [true, "text can't be empty"] }
})

const ProjectSchema = new Schema({
  project_name: { type: String, required: [true, "project_name can't be empty"] },
  project_description: { type: String, required: [true, "project_description can't be empty"] },
  created_by: { type: String, required: [true, "created_by can't be empty"] },
  created_at: { type: Date, required: [true, "created_at can't be empty"], default: Date.now },
  updated_at: { type: Date, required: [true, "updated_at can't be empty"] },
  project_sections: [ProjectSectionSchema],
  project_text: [ProjectTextSchema]
})




const Project = mongoose.model("Project", ProjectSchema)


export default Project
