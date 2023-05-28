import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    const loginData = {
      email,
      password,
    };

    console.log(email);
    try {
      await axios.post("/login", loginData).then((response) => {
        if(response.status == 200)
        {
          alert(response.data);
          navigate("/profile");
        }
      }).catch((response)=>{
        console.log(response);
        if(response.response.status == 404)
          alert(response.response.data);
      });
    } catch (error) {}
    event.preventDefault();
    setEmail("");
    setPassword("");
  };


  return (
    <div className="login-background">
      <div className="page">
        <div className="form">
          <div className="heading"> Login </div>
          <div>
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

            <button
              type="submit"
              className="button"
              formaction="/profilePage.js"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="already">
              Don't have an account? <span> </span>
              <Link to="/signup">signup</Link> Here.
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
