import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header2 = () => {
  const navigate = new useNavigate();
  const logout = async () => {
    
    try {
      await axios.get("/logout").then((Response)=>{
        if(Response.status == 200){
          navigate('/login');
          alert(Response.data);
        }
      }).catch((Response)=>{
        if(Response.Response.status == 401)
        {
          alert(Response.Response.data)
        }
      }
      );
    } catch (error) {}

  };
  return (
    <div>
      <div className="header-container">
        <div className="header">
          <h1 className="header-title">SentinelSky</h1>
          {/* <p>"Know your surrounding"</p> */}
        </div>
        <div className="header-links">
          <Link className="header-items" to="/">Home</Link>
          <Link className="header-items" to="/profile">Profile</Link>
          <Link className="header-items" to="/settings">Settings</Link>
          <Link className="header-items" onClick={logout}>Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Header2;