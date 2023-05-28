import React, { useState } from 'react';
import axios from 'axios';

const SettingsPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const updateLocation = (event) => {
    let requestLocationPermission = false;
    let latitude = "";
    let longitude = "";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        requestLocationPermission = true;
        const newLocation = {
          latitude,
          longitude
        };
        try {
          if (requestLocationPermission) {
            axios.post("/updateLocation", newLocation).then((response) => {
              if (response.status == 200) {
                alert(response.data);
              }
            }).catch((response)=>{
              if(response.response.status == 400)
              {
                alert(response.response.data);
              }
            });
          }
          else {
            alert("Please ALlow Location permission");
          }
        } catch (error) { }
        console.log(requestLocationPermission);
      },
      (error) => {
        console.log("User denied location access");
        alert("Please allow access to your location to continue.");
      }
    );

  }

  const handleSubmit = (event) => {
    if (oldPassword === '')
      alert("Enter old password to continue");
    else {
      const dataToUpdate = {
        oldPassword,
        username,
        newPassword:password
      }
      try {
        axios.post("/updateProfile", dataToUpdate).then((response) => {
            console.log(response);
              if (response.status == 200) {
                alert(response.data);
              }
              
            }).catch((response)=>{
              console.log(response);
              console.log(response.response.status);
              if(response.response.status==404)
                alert(response.response.data);
            });
        
      }
      catch (error) { }
    }
    event.preventDefault();
    // Reset form fields
    setUsername("");
    setPassword("");
    setOldPassword("");
    setShowOldPassword(false);
    setShowOldPassword(false);
  }



  return (
    <div className='settings-background'>
      <div className="page">
        <div className='form'>
          <div className='heading'>Settings</div>
          <div className="form-group">
            <label htmlFor="username">Currunt Password:</label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              className="form-input"
              value={oldPassword}
              name="oldPassword"
              onChange={(event) => setOldPassword(event.target.value)}
            />
            <label className="show-password">
              <input
                type="checkbox"
                checked={showOldPassword}
                onChange={(event) => setShowOldPassword(!showOldPassword)}
              />
              Show password
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              name="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className='form-input'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(!showPassword)}
              />
              Show password
            </label>
          </div>

          <br />
        <div>
          <button
            type="submit"
            className="button"
            onClick={handleSubmit}
          >
            Update
          </button>
          </div>
          <p> To update your location to currunt location: </p>
          <button
            type='button'
            className='button'
            onClick={updateLocation}
          > Update Location</button>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
