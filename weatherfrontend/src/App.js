import React, { useState, useEffect } from "react";
import "./App.css";
import { weathericon } from "./config/weathericon";
import GithubCorner from "react-github-corner";
import cities from "cities.json";

// cities=[
//   {
//     "country": "FR",
//     "name": "Lyon",
//     "lat": "45.75",
//     "lng": "4.583333"
//   },
//   ...
// ]

// <Tooltip title="Optional: Enter a two-letter country code after the city name to make the search more precise. For example, London, GB.">
//                     <Search />
//                   </Tooltip>
//                 </InputAdornme

const App = () => {
  const [location, setLocation] = useState("");
  const [countrycode, setCountrycode] = useState("");

  // const [latitude, setLatitude] = useState(0);

  // const [longitude, setLongitude] = useState(0);

  // const [fahrenheit, setFahrenheit] = useState(0);

  const [celsius, setCelsius] = useState(0);

  const [humidity, setHumidity] = useState(0);

  const [windspeed, setWindspeed] = useState(0);

  const [weatherid, setWeatherid] = useState(0);
  const [inputvalue, setInputvalue] = useState("");

  const inputsearch = (e) => {
    setInputvalue(e.target.value);
  };

  useEffect(() => {
    try {
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          fetch(
            "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
              data.latitude +
              "&lon=" +
              data.longitude +
              "&APPID=34e35ced0edac102f995450c1b6d4bae"
          )
            .then((response1) => response1.json())
            .then((data1) => {
              console.log(data1);
              console.log(data1.weather[0].id);

              setLocation(data.city);
              setCountrycode(data.country_code);
              // setLatitude(data.latitude);
              // setLongitude(data.longitude);
              // setFahrenheit(((data1.main.temp - 273.15) * 1.8 + 32).toFixed(1));
              setCelsius((data1.main.temp - 273.15).toFixed(1));
              setHumidity(data1.main.humidity.toFixed(1));
              setWindspeed((data1.wind.speed * 3.6).toFixed(1));
              setWeatherid(data1.weather[0].id);
            });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const weather = (wid) => {
    if (wid === weathericon.clearIcons) {
      return <i className="wi wi-day-sunny"></i>;
    }

    for (let i = 0; i < weathericon.cloudIcons.length; i++) {
      if (wid === weathericon.cloudIcons[i]) {
        return <i className="wi wi-cloudy"></i>;
      }
    }

    for (let i = 0; i < weathericon.thunderstormIcons.length; i++) {
      if (wid === weathericon.thunderstormIcons[i]) {
        return <i className="wi wi-thunderstorm"></i>;
      }
    }

    for (let i = 0; i < weathericon.sprinkleIcons.length; i++) {
      if (wid === weathericon.sprinkleIcons[i]) {
        return <i className="wi wi-sprinkle"></i>;
      }
    }

    for (let i = 0; i < weathericon.rainIcons.length; i++) {
      if (wid === weathericon.rainIcons[i]) {
        return <i className="wi wi-rain"></i>;
      }
    }

    for (let i = 0; i < weathericon.snowIcons.length; i++) {
      if (wid === weathericon.snowIcons[i]) {
        return <i className="wi wi-snow"></i>;
      }
    }

    for (let i = 0; i < weathericon.atmosphereIcons.length; i++) {
      if (wid === weathericon.atmosphereIcons[i]) {
        return <i className="wi wi-alien"></i>;
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="searchbar">
          <i className="fas fa-search-location searchicon "></i>
          <input
            className="searchinput"
            type="text"
            value={inputvalue}
            onChange={inputsearch}
          />
          <a className="btn-floating btn-medium pulse floating-pulse">
            <i className="material-icons">cloud</i>
          </a>
        </div>

        <div className="col s12">
          <div className="place col s6">
            <p>
              {location} , {countrycode}
            </p>
            <p>
              <i className="wi wi-thermometer"></i> {celsius}{" "}
              <i className="wi wi-celsius"></i>
            </p>
          </div>
          <div className="weathericon col s6">{weather(weatherid)}</div>
        </div>
        {/* 
        <div className="contContent">
          <div>
            <p>
              <i className="wi wi-thermometer"></i> {celsius}{" "}
              <i className="wi wi-celsius"></i>
            </p>
          </div>
        </div> */}

        <div className="row">
          <div className="col s1">
            <span>
              <i className="wi wi-humidity"></i>
              <p>{humidity}%</p>
            </span>
          </div>
          <div className="col s1 offset-s2">
            <span>
              <i className="wi wi-strong-wind"></i>
              <p>{windspeed}km/h</p>
            </span>
          </div>
        </div>

        {/* <hr></hr> */}
        <div class="card">
          <div class="card-tabs  ">
            <ul class="tabs tabs-fixed-width ">
              <li class="tab">
                <a class="active" href="#n4d">
                  Next 4 Days
                </a>
              </li>
              <li class="tab">
                <a href="#trend">Trend Curve</a>
              </li>
            </ul>
          </div>
          <div class="card-content teal lighten-3">
            <div id="n4d">
              <div>
                <div className="row">
                  <p>Stuff</p>
                </div>
                <div className="row">
                  <p>Stuff</p>
                </div>
                <div className="row">
                  <p>Stuff</p>
                </div>
                <div className="row">
                  <p>Stuff</p>
                </div>
              </div>
              <div id="trend"></div>
            </div>
          </div>
        </div>
        <div className="footer-copyright footer ">
          © 2020 Copyright
          <span className="right">
            <i class="fab fa-github"></i>
            <a
              className="white-text text-lighten-1 github "
              href="https://github.com/6vvvvvv/Reactjs_Weather_App"
            >
              Lau's Github
            </a>
          </span>
        </div>
        <GithubCorner
          href="https://github.com/6vvvvvv/Reactjs_Weather_App"
          bannerColor="#bfdcae"
          size={120}
          direction="right"
        />
      </div>
    </div>
  );
};

export default App;
