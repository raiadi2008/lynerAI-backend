import mongoose, { Schema } from "mongoose"

const ProjectTextSchema = new Schema({
  text: { type: String, required: [true, "text can't be empty"] }
})

const ProjectSectionSchema = new Schema({
  section_title: { type: String, required: [true, "section_title can't be empty"] },
  section_texts: [ProjectTextSchema]
})



const ProjectSchema = new Schema({
  project_name: { type: String, required: [true, "project_name can't be empty"] },
  project_description: { type: String, required: [true, "project_description can't be empty"] },
  created_by: { type: String, required: [true, "created_by can't be empty"] },
  created_at: { type: Date, required: [true, "created_at can't be empty"], default: Date.now },
  updated_at: { type: Date, required: [true, "updated_at can't be empty"] },
  project_sections: [ProjectSectionSchema],
  project_texts: [ProjectTextSchema],
  is_currently_active: Boolean
})




const Project = mongoose.model("Project", ProjectSchema)


export default Project
