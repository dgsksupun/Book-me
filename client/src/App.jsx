import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/LoginPage";
import LayOut from "./LayOut";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./userContext";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element ={<LayOut/>}>
      <Route index element ={<IndexPage/>}/>
      <Route path="/login" element ={<LoginPage/>}/>
      <Route path="/register" element ={<RegisterPage/>}/>
    </Route>
    </Routes>
    </UserContextProvider>
    
  
  );
}

export default App;
