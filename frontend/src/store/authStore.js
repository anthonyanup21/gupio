import { create } from "zustand"
import { axiosInstance } from "../axios/axios.js"
import toast from "react-hot-toast"

const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isCheckingAuth: true,
    isLoggingIn:false,
    isSigningUp:false,

    login: async (email, password) => {

        try {
            set({ isLoggingIn: true })
            const res = await axiosInstance.post("/auth/login", { email, password })
            set({ isLoggingIn: false, isAuthenticated: true, user: res.data.user })
            toast.success("Logged in Successfylly")
        } catch (error) {
            set({ isLoggingIn: false })
            toast.error(error.response.data.message || "something went wrong")
            console.log(error)
        }

    },
    signup: async (fullName, email, password) => {

        try {
            set({ isSigningUp: true })

            const res = await axiosInstance.post("/auth/signup", { fullName, email, password })
            set({ isSigningUp: false, user: res.data.user, isAuthenticated: true })
            toast.success("Account created successfully")
        } catch (error) {
            set({ isSigningUp: false })
            toast.error(error.response.data.message || "something went wrong")
            console.log(error)


        }

    },

    logout: async () => {
        try {
            set({ isLoading: true })
            await axiosInstance.get("/auth/logout")
            set({ user: null, isLoading: false, isAuthenticated: false })
            toast.success("Logged out Successfylly")


        } catch (error) {
            set({ isLoading: false })
            toast.error(error.response.data.message || "something went wrong")
            console.log(error)

        }

    },
    checkAuth: async () => {

        try {
            const res = await axiosInstance.get("/auth/check-auth")
            set({ user: res.data.user, isCheckingAuth: false, isAuthenticated: true })

        } catch (error) {
            set({ user: null, isCheckingAuth: false, isAuthenticated: false })
            console.log(error)
        }
    },

}))

export default useAuthStore