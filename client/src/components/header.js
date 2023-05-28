import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <h1 className="header-title">SentinelSky</h1>
        {/* <p>"Know your surrounding"</p> */}
      </div>
      <div className="header-links">
        <Link className="header-items" to="/">
          Home
        </Link>
        {/* <Link className="header-items" to="/profile">Profile</Link> */}
        <Link className="header-items" to="/login">
          Login
        </Link>
        <Link className="header-items" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Header;
