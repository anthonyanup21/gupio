import { Router } from "express";
import {getAllTasks,getSpecificTask,createTask,editTask,deleteTask} from "../controllers/task.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js";
const router=Router()

router.get("/",verifyToken,getAllTasks)//get all tasks
router.post("/",verifyToken,createTask)//create a task
router.get("/:id",verifyToken,getSpecificTask)//get a specific task
router.patch("/:id",verifyToken,editTask)//edit a task
router.delete("/:id",verifyToken,deleteTask)//delete a task

export default router