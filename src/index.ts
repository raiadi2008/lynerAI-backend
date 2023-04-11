import express, { Express, Request, Response } from "express"
import cors from "cors"

import "./config/parse_config.js"
import "./db/connect_db.js"
import firebase from "./firebase/init.js"
import projectRouter from "./routers/project_router.js"

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

// middleware
app.use(express.json({ limit: 1024 }))
app.use(cors())

// routes
app.use(projectRouter)

app.listen(port, () => {
  console.log(`app working on http://localhost:${port}`)
})
