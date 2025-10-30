import { create } from "zustand"
import { axiosInstance } from "../axios/axios"
import toast from "react-hot-toast"

const useTaskStore = create((set, get) => ({
  createdTasks: [],
  assignedTasks: [],
  selectedTask: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  fetchTasks: async () => {
    try {
      set({ isLoading: true })
      const res = await axiosInstance.get("/tasks")
      set({
        createdTasks: res.data.createdTasks || [],
        assignedTasks: res.data.assignedTasks || [],
        isLoading: false,
      })
    } catch (error) {
      console.error("Error fetching tasks:", error)
      set({ isLoading: false })
      toast.error(error.response?.data?.message || "Failed to load tasks")
    }
  },

  createTask: async (taskData) => {
    try {
      set({ isCreating: true })
      const res = await axiosInstance.post("/tasks", taskData)
      set((state) => ({
        createdTasks: [...state.createdTasks, res.data.task],
        isCreating: false,
      }))
      toast.success("Task created successfully!")
    } catch (error) {
      console.error("Error creating task:", error)
      set({ isCreating: false })
      toast.error(error.response?.data?.message || "Failed to create task")
    }
  },

  getTaskById: async (id) => {
    try {
      set({ isLoading: true })
      const res = await axiosInstance.get(`/tasks/${id}`)
      set({ selectedTask: res.data.task, isLoading: false })
    } catch (error) {
      console.error("Error fetching task:", error)
      set({ isLoading: false })
      toast.error(error.response?.data?.message || "Failed to get task")
    }
  },

  updateTask: async (id, updatedData) => {
    try {
      set({ isUpdating: true })
      const res = await axiosInstance.patch(`/tasks/${id}`, updatedData)
      set((state) => ({
        createdTasks: state.createdTasks.map((t) =>
          t._id === id ? res.data.task : t
        ),
        assignedTasks: state.assignedTasks.map((t) =>
          t._id === id ? res.data.task : t
        ),
        isUpdating: false,
      }))
      toast.success("Task updated successfully!")
    } catch (error) {
      console.error("Error updating task:", error)
      set({ isUpdating: false })
      toast.error(error.response?.data?.message || "Failed to update task")
    }
  },

  deleteTask: async (id) => {
    try {
      set({ isDeleting: true })
      await axiosInstance.delete(`/tasks/${id}`)
      set((state) => ({
        createdTasks: state.createdTasks.filter((t) => t._id !== id),
        assignedTasks: state.assignedTasks.filter((t) => t._id !== id),
        isDeleting: false,
      }))
      toast.success("Task deleted successfully!")
    } catch (error) {
      console.error("Error deleting task:", error)
      set({ isDeleting: false })
      toast.error(error.response?.data?.message || "Failed to delete task")
    }
  },
}))

export default useTaskStore
