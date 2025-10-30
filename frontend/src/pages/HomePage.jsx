import React, { useState } from "react"
import useTaskStore from "../store/taskStore"
import toast from "react-hot-toast"

const HomePage = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  const { createTask, isCreating } = useTaskStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !dueDate || !assignedTo)
      return toast.error("All fields are required")

    await createTask({ title, description, dueDate, assignedTo })

    setTitle("")
    setDescription("")
    setDueDate("")
    setAssignedTo("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 p-6 rounded-2xl shadow-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-primary">Create Task</h2>

      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <input
        type="date"
        className="input input-bordered w-full mb-3"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <input
        type="email"
        placeholder="Assign to (email)"
        className="input input-bordered w-full mb-3"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create Task"}
      </button>
    </form>
  )
}

export default HomePage
