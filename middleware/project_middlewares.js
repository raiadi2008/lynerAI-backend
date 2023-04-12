import { HttpStatusCode, HttpStatusMessage } from "../constants/http_constants.js"

const verifyCreateProjectRequestMiddleware = (
  req,
  res,
  next
) => {
  const { project_name, project_description } = req.body
  if (!project_name || !project_description) {
    let reason = HttpStatusMessage.BAD_REQUEST
    if (project_name === undefined) {
      reason = "project_name is required"
    } else if (project_description === undefined) {
      reason = "project_description is required"
    }
    return res.status(HttpStatusCode.BAD_REQUEST).send(reason)
  }
  next()
}

export { verifyCreateProjectRequestMiddleware }