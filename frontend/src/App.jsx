import React, { useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/HomePage"
import {Routes,Route, Navigate} from "react-router"
import useAuth from "./store/authStore.js";

const App = () => {
  const {user,checkAuth,isCheckingAuth}=useAuth()
  useEffect(() => {
   
    checkAuth()
  
    
  }, [checkAuth])


  if(isCheckingAuth && !user){
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    )
  }
  
  return (
    <div>
      <Routes>
        <Route path="/login" element={!user?<Login/>:<Navigate to="/" replace/>}  />
        <Route path="/signup" element={!user?<Signup/>:<Navigate to="/" replace/>} />
        <Route path="/" element={user?<Home/>:<Navigate to="/login" replace/>}/>




      </Routes>


     

    </div>
  );
};

export default App;
