const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const mongoDB = require("./db/mongoose");
mongoDB();
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");
const port = 5000;
const app = express();

const server = http.createServer(app);

const cron = require('node-cron');
const { Novu } = require("@novu/node")
const User = require("../src/schema/userSchema");
const novu = new Novu('f2950021f778562c5f24f02ce8b5ecfa');
const axios = require('axios');
const { response } = require("express");

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

async function sendWeatherEmail() {
  const users = User.find({ weatherNotifications: true });
  users.then((foundUsers) => {
    foundUsers.forEach((user) => {
      latitude = user.location.latitude;
      longitude = user.location.longitude;
      const apiKey = 'f22995ec17f12888ea1aa01aede68a1e';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      axios.get(apiUrl).then((response) => {
        const forecastData = response.data;
        const oneDayForecast = forecastData.list.slice(0, 8);
        console.log("fsd");
        novu.trigger('weather-report', {
          to: {
            subscriberId: user._id.toString(),
            email: user.email
          },
          payload: {
            username: user.username,
            Time1: oneDayForecast[0].dt_txt,
            t1: oneDayForecast[0].main.temp,
            h1: oneDayForecast[0].main.humidity,
            p1: oneDayForecast[0].main.pressure,
            w1: oneDayForecast[0].wind.speed,
            wd1: oneDayForecast[0].wind.deg,

            Time2: oneDayForecast[1].dt_txt,
            t2: oneDayForecast[1].main.temp,
            h2: oneDayForecast[1].main.humidity,
            p2: oneDayForecast[1].main.pressure,
            w2: oneDayForecast[1].wind.speed,
            wd2: oneDayForecast[1].wind.deg,

            Time3: oneDayForecast[2].dt_txt,
            t3: oneDayForecast[2].main.temp,
            h3: oneDayForecast[2].main.humidity,
            p3: oneDayForecast[2].main.pressure,
            w3: oneDayForecast[2].wind.speed,
            wd3: oneDayForecast[2].wind.deg,

            Time4: oneDayForecast[3].dt_txt,
            t4: oneDayForecast[3].main.temp,
            h4: oneDayForecast[3].main.humidity,
            p4: oneDayForecast[3].main.pressure,
            w4: oneDayForecast[3].wind.speed,
            wd4: oneDayForecast[3].wind.deg,

            Time5: oneDayForecast[4].dt_txt,
            t5: oneDayForecast[4].main.temp,
            h5: oneDayForecast[4].main.humidity,
            p5: oneDayForecast[4].main.pressure,
            w5: oneDayForecast[4].wind.speed,
            wd5: oneDayForecast[4].wind.deg,

            Time6: oneDayForecast[5].dt_txt,
            t6: oneDayForecast[5].main.temp,
            h6: oneDayForecast[5].main.humidity,
            p6: oneDayForecast[5].main.pressure,
            w6: oneDayForecast[5].wind.speed,
            wd6: oneDayForecast[5].wind.deg,
          }
        });
        console.log("fd");
      }).catch((error) => {
        console.log("eefg")
        // console.error('Error fetching weather forecast:', error);
      });
    });

  });
}

async function weather(latitude, longitude) {


};

cron.schedule('42 16 * * *', () => {
  // sendWeatherEmail();
});



server.listen(port, () => {
  console.log(`Server started on port ${port}!!!`);
  sendWeatherEmail();
});
