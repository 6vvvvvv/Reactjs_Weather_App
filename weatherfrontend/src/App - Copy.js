import React, { Component } from "react";
import "./App.css";


var clearIcons = 800;
var cloudIcons = [801, 802, 803, 804];
var thunderstormIcons = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
var sprinkleIcons = [300, 301, 302, 310, 311, 312, 313, 314, 321];
var rainIcons = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
var snowIcons = [600, 601, 602, 611, 612, 615, 616, 620, 621, 622];
var atmosphereIcons = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      countrycode: "",
      latitude: 0,
      longitude: 0,
      fahrenheit: 0,
      celsius: 0,
      humidity: 0,
      windspeed: 0,
      weatherid: 0,
      day: "",
      time: "",
    };
  }

  componentDidMount = () => {
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

              this.setState({
                location: data.city,
                countrycode: data.country_code,
                latitude: data.latitude,
                longitude: data.longitude,
                fahrenheit: ((data1.main.temp - 273.15) * 1.8 + 32).toFixed(1),
                celsius: (data1.main.temp - 273.15).toFixed(1),
                humidity: data1.main.humidity.toFixed(1),
                windspeed: (data1.wind.speed * 3.6).toFixed(1),
                weatherid: data1.weather[0].id,
              });
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  weather = (wid) => {
    if (wid === clearIcons) {
      return <i className="wi wi-day-sunny"></i>;
    }

    for (let i = 0; i < cloudIcons.length; i++) {
      if (wid === cloudIcons[i]) {
        return <i className="wi wi-cloudy"></i>;
      }
    }

    for (let i = 0; i < thunderstormIcons.length; i++) {
      if (wid === thunderstormIcons[i]) {
        return <i className="wi wi-thunderstorm"></i>;
      }
    }

    for (let i = 0; i < sprinkleIcons.length; i++) {
      if (wid === sprinkleIcons[i]) {
        return <i className="wi wi-sprinkle"></i>;
      }
    }

    for (let i = 0; i < rainIcons.length; i++) {
      if (wid === rainIcons[i]) {
        return <i className="wi wi-rain"></i>;
      }
    }

    for (let i = 0; i < snowIcons.length; i++) {
      if (wid === snowIcons[i]) {
        return <i className="wi wi-snow"></i>;
      }
    }

    for (let i = 0; i < atmosphereIcons.length; i++) {
      if (wid === atmosphereIcons[i]) {
        return <i className="wi wi-alien"></i>;
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="contHead">
            <p>
              {this.state.location} , {this.state.countrycode}{" "}
              {this.weather(this.state.weatherid)}
            </p>
          </div>

          <hr></hr>

          <div className="contContent">
            <div>
              <p>
                <i className="wi wi-thermometer"></i> {this.state.celsius}{" "}
                <i className="wi wi-celsius"></i>
              </p>
            </div>
          </div>

          <div className="bottombox">
            <div id="bottombox">
              <div className="bottomleft">
                <span>
                  <i className="wi wi-humidity"></i>
                </span>
                {this.state.humidity}%
              </div>
              <div className="bottomright">
                <span>
                  <i className="wi wi-strong-wind"></i>
                </span>
                {this.state.windspeed}km/h
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
