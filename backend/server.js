import express from "express"
import taskRoutes from "./routes/taskk.routes.js"
import userRoutes from "./routes/user.router.js"
import {connectDB} from "./db/connectDB.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()
const app=express()
app.use(cors({origin:"http://localhost:5173/",credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",userRoutes)
app.use("/api/tasks",taskRoutes)

connectDB().then(()=>{
    app.listen(3000,()=>{
    console.log("server started at port 3000")
})

})
