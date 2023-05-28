import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function SignUpPage(props) {


  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  let requestLocationPermission = false;


  const HandleSubmit = async (event) => {
    if(username && email && password){
    let latitude = "";
    let longitude = "";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        requestLocationPermission = true;
        const userData = {
          username,
          email,
          password,
          location: { latitude, longitude },
        };
        try {
          axios.post("/signup", userData).then((response) => {
            console.log(response);
            if(response.status == 200)
            {
              requestLocationPermission = true;
            }
          }
        ).catch((response)=> {
          console.log(response);
          if(response.response.status == 400)
          {
            alert(response.response.data);
            requestLocationPermission = false;
          }
          if(response.response.status == 500)
          {
            alert("Something went wrong");
            requestLocationPermission = false;
          }
        }).finally(()=>{
          if (requestLocationPermission) {
            alert("Succesfully signed up");
            navigate("/profile");
          }
        });
        } catch (error) {}
     
        // console.log(requestLocationPermission);
      },
      (error) => {
        console.log("User denied location access");
        alert("Please allow access to your location to continue.");
      }
    );
    event.preventDefault();
    // Reset form fields
    setUsername("");
    setEmail("");
    setPassword("");

    }else{
      alert("All fields are required");
    }
  };

  if (requestLocationPermission) {
    navigate('/profile');
  }

  return (
    <div className="signupPage-background">
      <div className="page">
        <div className="form">
          <div className="heading">Sign Up</div>
          <div>
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                value={password}
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
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

      
            {/* Submit Button */}
            <button
              type="submit"
              className="button"
              formaction="/profilePage.js"
              onClick={HandleSubmit}
            >
              Sign Up
            </button>
            {/* </Link> */}
            <div className="already">
              Already have an account?<span> </span>
              <Link to="/login">Login</Link> Here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;
