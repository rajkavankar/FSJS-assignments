import dotenv from "dotenv"
import express from "express"
dotenv.config()

const app = express()
const port = process.env.PORT
const data = []

for (let i = 0; i < 20; i++) {
  data.push({
    id: i + 1,
    title: `Post ${i + 1}`,
    body: `This is post ${i + 1}.`,
  })
}

app.get("/posts", (req, res) => {
  res.status(200).json({
    success: true,
    data,
  })
})
app.listen(port, () => console.log(`Server is running in port ${port}`))
