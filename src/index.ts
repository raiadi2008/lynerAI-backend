import express, { Express, Request, Response } from "express"

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World is new lang!")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
