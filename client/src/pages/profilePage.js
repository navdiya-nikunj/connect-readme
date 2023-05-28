import React, { useState, useEffect } from "react";
import axios from "axios";

import Logo from "./user-regular.svg";


const ProfilePage = () => {
  const [weatherReportEnabled, setWeatherReportEnabled] = useState(false);
  const [username,setUsername] = useState("");
  

  const handleWeatherReportToggle = () => {
    setWeatherReportEnabled(!weatherReportEnabled);
  };


  useEffect( () => {

     axios.get("/savedProfile").then((response) => {
      setWeatherReportEnabled(response.data.weatherNotifications);
      setUsername(response.data.username);
    }).catch((response)=>{
      // console.log(response);
      if(response.response.status == 404)
      {
        alert(response.response.data);
      }
    });
  }, []);

  const handleUpdate = async () => {
    const states = {
      weatherReportEnabled,
    };
    try {
      await axios.post("/profile", states);
    } catch (error) {}

  };

  return (
    <div className="profile-background">
      <div className="page">
        <div className="form">
          <div className="heading">
            <img
              src={Logo}
              alt="Settings Logo"
              className="logo"
              width={"38px"}
              height={"38px"}
            />{" "}
            Profile
          </div>
          <br />
          <div className="form-group">
            <div>Username: <span >{username}</span> </div>
          </div>
          <form>
            <div className="toggle-group">
              <label>Weather Report:</label>
              <label className="switch">
                <input
                  type="checkbox"
                  className="form-input"
                  checked={weatherReportEnabled}
                  onChange={handleWeatherReportToggle}
                />
                <span className="slider"></span>
              </label>
            </div>
            <button className="button" onClick={handleUpdate}>
              Set
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;