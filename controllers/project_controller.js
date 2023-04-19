import ProjectDB from "../db/project_db.js"
import {
  HttpStatusCode,
  HttpStatusMessage,
} from "../constants/http_constants.js"

export const createProject = (req, res) => {
  const user = req.user
  const project = req.body

  ProjectDB.create({
    project_name: project.project_name,
    project_description: project.project_description,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user.id,
    project_sections: [],
    project_text: [],
  })
    .then((project) => {
      res.status(HttpStatusCode.CREATED).send(project)
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}

export const getProjects = (req, res) => {
  const { limit = 4, page = 1 } = req.query
  const user = req.user
  ProjectDB.getProjects(Number(limit), Number(page), user.id)
    .then((projects) => {
      res.status(HttpStatusCode.OK).send({
        projects: projects,
      })
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}

export const getProjectById = (req, res) => {
  const { id } = req.params
  const user = req.user
  ProjectDB.getProjectById(id, user.id)
    .then((project) => {
      if (project) res.status(HttpStatusCode.OK).send(project)
      else
        res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}

export const createProjectSection = (req, res) => {
  const { id } = req.params
  const user = req.user
  const { section_title, section_texts = [] } = req.body

  ProjectDB.getProjectById(id, user.id).then((project) => {
    if (project) {
      project.project_sections.push({
        section_title: section_title,
        section_texts: section_texts,
      })
      ProjectDB.save(project)
        .then((project) => res.status(HttpStatusCode.OK).send(project))
        .catch((error) => {
          res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
        })
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
    }
  })
}

export const updateProjectSection = (req, res) => {
  const { id } = req.params
  const user = req.user
  const { section_id, section_title = null, section_texts = null } = req.body

  if (section_id === null) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .send(HttpStatusMessage.BAD_REQUEST)
  }

  ProjectDB.getProjectById(id, user.id)
    .then((project) => {
      if (project) {
        project.project_sections.forEach((section) => {
          if (section._id.toString() === section_id) {
            if (section_title) section.section_title = section_title
            if (section_texts) {
              while (section.section_texts.length > 0) {
                section.section_texts.pop()
              }
              section_texts.forEach((text) => {
                section.section_texts.push(text)
              })
            }
          }
        })

        ProjectDB.save(project)
          .then((project) => {
            res.status(HttpStatusCode.OK).send(project)
          })
          .catch((err) => {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err)
          })
      } else {
        res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
      }
    })
    .catch((error) => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
    })
}

export const deleteProjectSection = async (req, res) => {
  const { id, section_id } = req.params
  const user = req.user
  const project = await ProjectDB.getProjectById(id, user.id)
  if (project) {
    project.project_sections = project.project_sections.filter(
      (section) => section._id.toString() !== section_id
    )
  } else {
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .send(HttpStatusMessage.NOT_FOUND)
  }
  const result = await ProjectDB.save(project)
  res.status(HttpStatusCode.OK).send(result)
}

export const addTextToProject = async (req, res) => {
  const { id } = req.params
  const user = req.user
  const { text } = req.body
  console.log("text", text)

  const project = await ProjectDB.getProjectById(id, user.id)
  if (project) {
    project.project_texts.push({
      text: text
    })
    const result = await ProjectDB.save(project)
    res.status(HttpStatusCode.OK).send(result)
  } else {
    return res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
  }
}

export const deleteTexts = async (req, res) => {
  const { id, text_id, section_id } = req.params
  const user = req.user
  const text_ids = req.query.text_id

  const project = await ProjectDB.getProjectById(id, user.id)
  if (project) {
    if (section_id) {
      project.project_sections.forEach((val) => {
        if (val._id.toString() === section_id) {
          val.section_texts = val.section_texts.filter((tval) => tval._id.toString() !== text_id)
        }
      })
    } else {
      project.project_texts = project.project_texts.filter((val) => val._id.toString() !== text_id)
    }
  } else {
    return res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusMessage.NOT_FOUND)
  }
  const result = await ProjectDB.save(project)
  res.status(HttpStatusCode.OK).send(result)
}
