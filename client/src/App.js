
import React, { useState } from "react";
import "./index.css";
import "./App.css";
import IndexPage from "./pages/indexPage";
import Login from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import SignUpPage from "./pages/signupPage";
import SettingsPage from "./pages/settingsPage";
import axios from "axios";
import { useEffect } from "react";

// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import Header2 from "./components/header2";


function App() {

  const [loginFlag,setLoginFlag] = useState(false);

useEffect( () => {
   axios.get("/userExistence").then((response) => {
    setLoginFlag(response.data);
  });
  return () => {
    console.log('Component unmounted');
  };
}, []);
  return (
    <div>
      {!loginFlag && <Header/>}
      {loginFlag &&  <Header2/>}
    <Routes>
      <Route exact path="/signup"  element={<SignUpPage />}/>
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/settings" element={<SettingsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;