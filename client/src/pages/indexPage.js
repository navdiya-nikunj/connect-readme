import React from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

function IndexPage() {
  return (
    <div className="index-background">
      <br/>
      <div class="index-heading">
        <h1 id="weather">SentinelSky</h1>
        <div className="sub">
          <span className="head">Subscribe to </span>
          <TypeAnimation
            className="typing"
            sequence={[
              "Email-Notifications", // Types 'One'
              1000, // Waits 1s
              "Weather Report", // Deletes 'One' and types 'Two'
              1000, // Waits 2s
            ]}
            cursor={true}
            repeat={Infinity}
          />
        </div>
        <p>
          <h4>
          Stay informed and prepared with instant SMS notifications and accurate weather reports delivered straight to your email.
          </h4>
        </p>
      </div>
      <br />
      <div className="index-box">
        <div class="element-items">
          <div>
            <span>How it Works?</span>
            <br />
            <ol>
              <li>
                Sign up for our service with your Email and location.
              </li>
              <li>
                We will send you daily weather report on your email in the morning.
              </li>
              <li>Stay safe and prepared!</li>
            </ol>
          </div>
          <img src="/user.jpeg" className="image" alt="" />
        </div>

        <div class="element-items">
          <img src="/weather4.jpg" alt="" className="image" />
          <div>
            <span>Why Choose SentinalSky?</span>
            <br />
            <ul>
              <li>Reliable and accurate notifications.</li>
              <li>Easy to use and user-friendly interface.</li>
            </ul>
          </div>
        </div>
      </div>
      <br/>
      <div class="index-heading">
        <div className="sign">Sign Up Now</div>
        <p className="message">
          Don't wait until it's too late! Sign up now to start receiving weather
          and disaster SMS notifications.
        </p>
        <Link to="/signup">
          <button id="but" herf="/signup" className="button">
            Sign Up
          </button>
        </Link>
      </div>
      <br />
    </div>
  );
}

export default IndexPage;
