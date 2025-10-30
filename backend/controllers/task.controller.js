import Task from "../models/task.model.js"
import User from "../models/user.model.js"

// ✅ Get all tasks for a user
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: "User not found" })

    // tasks created by the user
    const createdTasks = await Task.find({ owner: userId })

    // tasks assigned to the user's email
    const assignedTasks = await Task.find({ assignedTo: user.email })

    res.status(200).json({
      success: true,
      createdTasks,
      assignedTasks,
    })
  } catch (error) {
    console.log("error in getAllTasks controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// ✅ Create new task
export const createTask = async (req, res) => {
  try {
    const userId = req.userId
    const { title, description, dueDate, assignedTo } = req.body

    if (!title || !description || !dueDate)
      return res.status(400).json({ message: "All fields are required" })

    // optional: check if assigned email exists
    let assignedUser = null
    if (assignedTo) {
      assignedUser = await User.findOne({ email: assignedTo })
      if (!assignedUser)
        return res.status(404).json({ message: "Assigned user not found" })
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      owner: userId,
    })

    await newTask.save()
    res.status(201).json({ success: true, task: newTask })
  } catch (error) {
    console.log("error in createTask controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// ✅ Get specific task by ID
export const getSpecificTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findById(taskId)
    if (!task) return res.status(404).json({ message: "Task not found" })

    res.status(200).json({ success: true, task })
  } catch (error) {
    console.log("error in getSpecificTask controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// ✅ Edit/Update a task
export const editTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const { title, description, dueDate, assignedTo, status } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, assignedTo, status },
      { new: true, runValidators: true }
    )

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" })

    res.status(200).json({ success: true, task: updatedTask })
  } catch (error) {
    console.log("error in editTask controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// ✅ Delete a task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const deletedTask = await Task.findByIdAndDelete(taskId)

    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" })

    res.status(200).json({ success: true, message: "Task deleted successfully" })
  } catch (error) {
    console.log("error in deleteTask controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
