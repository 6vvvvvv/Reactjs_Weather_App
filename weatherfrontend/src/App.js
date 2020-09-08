import React, { useState, useEffect } from "react";
import "./App.css";
import { weathericon } from "./config/weathericon";
import GithubCorner from "react-github-corner";
import { Line } from "react-chartjs-2";

const App = () => {
  const [location, setLocation] = useState("");
  const [countrycode, setCountrycode] = useState("");
  const [weatherdescription, setWeatherdescription] = useState("");
  const [celsius, setCelsius] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windspeed, setWindspeed] = useState(0);
  const [weatherid, setWeatherid] = useState(0);
  const [inputvalue, setInputvalue] = useState("");
  const [searchlocation, setSearchlocation] = useState("");
  const [trend, setTrend] = useState();
  const [trend3h, setTrend3h] = useState();
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [zone, setZone] = useState("");
  const [showTrendActive, setShowTrendActive] = useState(false);

  useEffect(() => {
    // when you search input field is not equal to 0 else show local ip weather
    if (searchlocation.length !== 0) {
      Promise.all([
        fetch(
          `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${searchlocation}&appid=34e35ced0edac102f995450c1b6d4bae`
        ).then((res) => res.json()),
        fetch(
          `https://cors-anywhere.herokuapp.com/https://global-time.p.rapidapi.com/getglobaltime?locale=${searchlocation}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "global-time.p.rapidapi.com",
              "x-rapidapi-key":
                "36ff827798msh0b08408c4d3522cp14bfcejsn602beb5fc366",
            },
          }
        ).then((res) => res.json()),
      ])
        .then((data) => {
          const temp = data[0].city.name.split(" ");
          if (temp[0] === "Arrondissement") {
            setLocation(temp[2]);
          } else {
            setLocation(data[0].city.name);
          }

          setCountrycode(data[0].city.country);
          setCelsius((data[0].list[0].main.temp - 273.15).toFixed(1));
          setHumidity(data[0].list[0].main.humidity.toFixed(1));
          setWindspeed((data[0].list[0].wind.speed * 3.6).toFixed(1));
          setWeatherid(data[0].list[0].weather[0].id);
          setWeatherdescription(data[0].list[0].weather[0].description);
          setTrend(data[0].list.slice(1, 9));
          setTrend3h(data[0].list.slice(1, 6));
          setDay(data[1].Weekday);
          setTime(data[1].TimeStamp);
          setZone(data[1].Zone);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          Promise.all([
            fetch(
              "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
                data.latitude +
                "&lon=" +
                data.longitude +
                "&APPID=34e35ced0edac102f995450c1b6d4bae"
            ).then((res) => res.json()),
            fetch(
              `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${data.city}&appid=34e35ced0edac102f995450c1b6d4bae`
            ).then((res) => res.json()),
            fetch(
              "https://cors-anywhere.herokuapp.com/https://global-time.p.rapidapi.com/getglobaltime?locale=Lyon",
              {
                method: "GET",
                headers: {
                  "x-rapidapi-host": "global-time.p.rapidapi.com",
                  "x-rapidapi-key":
                    "36ff827798msh0b08408c4d3522cp14bfcejsn602beb5fc366",
                },
              }
            ).then((res) => res.json()),
          ]).then((data1) => {
            const temp = data.city.split(" ");
            if (temp[0] === "Arrondissement") {
              setLocation(temp[2]);
            } else {
              setLocation(data.city);
            }

            setLocation(data.city);
            setCountrycode(data.country_code);
            setCelsius((data1[0].main.temp - 273.15).toFixed(1));
            setHumidity(data1[0].main.humidity.toFixed(1));
            setWindspeed((data1[0].wind.speed * 3.6).toFixed(1));
            setWeatherid(data1[0].weather[0].id);
            setWeatherdescription(data1[0].weather[0].description);
            setTrend(data1[1].list.slice(1, 9));
            setTrend3h(data1[1].list.slice(1, 6));
            setTime(data1[2].TimeStamp);
            setDay(data1[2].Weekday);
            setZone(data1[2].Zone);
          });
        });
    }
  }, [searchlocation]);

  useEffect(() => {
    console.log("trend", trend);
  }, [trend]);

  const inputsearch = (e) => {
    setInputvalue(e.target.value);
  };

  const inputsubmit = (e) => {
    // e.preventDefault();
    console.log("one click");
    setSearchlocation(inputvalue);
  };

  const showtrend = () => {
    setShowTrendActive(!showTrendActive);
    console.log("showACTIVE", showTrendActive);
  };

  const trenddata =
    trend && trend.map((item) => (item.main.feels_like - 273.15).toFixed(1));

  const state = {
    labels: ["+3", "+6", "+9", "+12", "+15", "+18", "+21", "+24"],
    datasets: [
      {
        label: "feels_like",
        fill: false,
        lineTension: 0.5,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: trenddata,
      },
    ],
  };

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
            <i className="material-icons" onClick={inputsubmit}>
              cloud
            </i>
          </a>
        </div>

        <div className="col s12">
          <div className="place col s3 ">
            <p>
              {location} , {countrycode}
            </p>
            <p>
              {day},{time},{zone}
            </p>
            <p>
              <i className="wi wi-thermometer"></i> {celsius}{" "}
              <i className="wi wi-celsius"></i>
            </p>
          </div>
          <div className="weathersituation ">
            <span className="weathericon">{weather(weatherid)}</span>
            <span className="weatherdescription">{weatherdescription}</span>
          </div>
        </div>

        <div className="row humidity-wind">
          <div className="col s1 humidity small">
            <span>
              <i className="wi wi-humidity"></i>
              <p>{humidity}%</p>
            </span>
          </div>
          <div className="col s1 offset-s2 wind small">
            <span>
              <i className="wi wi-strong-wind"></i>
              <p>{windspeed}km/h</p>
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-tabs">
            <ul className="tabs tabs-fixed-width ">
              <li className="tab">
                <a className="active" href="#n3h" onClick={showtrend}>
                  Next 3 hours
                </a>
              </li>
              <li className="tab">
                <a href="#trend" onClick={showtrend}>
                  Trend Curve
                </a>
              </li>
            </ul>
          </div>
          <div className="card-content teal lighten-3">
            <div id="n3h">
              {showTrendActive ? (
                <Line
                  data={state}
                  options={{
                    title: {
                      display: true,
                      text: "Temperature Next 3 Hours",
                      fontSize: 15,
                    },
                  }}
                />
              ) : (
                trend3h &&
                trend3h.map((item, id) => (
                  <div className="row" key={id}>
                    <span className="time  left">{item.dt_txt}</span>
                    <span className="time-weather-icon">
                      {weather(item.weather[0].id)}
                      <span className="time-weather-main">
                        {item.weather[0].main}
                      </span>
                    </span>
                    <span className="feel-like">
                      <span className="min-temp">
                        {(item.main.feels_like - 273.15).toFixed(1)}
                      </span>
                      <i className="wi wi-celsius wi-temp"></i>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="footer-copyright footer ">
          © 2020 Copyright
          <span className="right">
            <i className="fab fa-github"></i>
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
