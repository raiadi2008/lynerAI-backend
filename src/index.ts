import express, { Express, Request, Response } from "express"

import "./config/parse_config.js"
import "./db/connect_db.js"

import authRouter from "./routers/auth_router.js"
import userProjectRouter from "./routers/user_project_routers.js"

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

// middleware
app.use(express.json({ limit: 1024 }))

// routes
app.use(authRouter)
app.use(userProjectRouter)

app.listen(port, () => {
  console.log(`app working on http://localhost:${port}`)
})
