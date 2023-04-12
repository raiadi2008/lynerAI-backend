import * as dotenv from "dotenv"
import path from "path"
import { DEV_ENV, PROD_ENV, UAT_ENV } from "../constants/env_constants.js"

if (process.env.NODE_ENV === DEV_ENV) {
  dotenv.config({ path: path.resolve(__dirname, "./.env.dev") })
} else if (process.env.NODE_ENV === UAT_ENV) {
  dotenv.config({ path: path.resolve(__dirname, "./.env.uat") })
} else if (process.env.NODE_ENV === PROD_ENV) {
  dotenv.config({ path: path.resolve(__dirname, "./.env.prod") })
} else {
  console.log("the path", path.resolve(process.cwd(), ".env"))
  dotenv.config({ path: path.resolve(process.cwd(), ".env") })
}