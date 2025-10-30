import {Router} from "express"
import { login, logout, signup,checkAuth } from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js"


const route=Router()

route.post("/login",login)

route.post("/signup",signup)

route.get("/logout",logout)

route.get("/check-auth",verifyToken,checkAuth)

export default route