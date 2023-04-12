import mongoose from "mongoose"
const DB_URL = process.env.DB

if (DB_URL === undefined) {
  throw new Error("DB_URL is undefined")
} else {
  mongoose.connect(DB_URL, {}).then((value) => {
    console.log("Connected to DB")
  })
}
