import React, { Component } from "react";
import Weth from "./components/weth";
import FormCompo from './components/formCompo';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "weather-icons/css/weather-icons.css";

const API_KEY = "0280296029325e7498a65eb7b6d70990";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      icon: "",
      main: "",
      celsius: "",
      temp_max: "",
      temp_min: "",
      description: "",
      error: false,
    };
    this.weatherIcon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }
calcullateCelsius(temp){
  let cel = Math.floor(temp-273.15)
  return cel;
}

get_weatherIcon(icons,rangeID) {
  switch(true)
  {
    case rangeID >= 200 && rangeID <= 232:
       this.setState({icon:this.weatherIcon.Thunderstorm})
    break;
    case rangeID >= 300 && rangeID <= 321:
       this.setState({icon:this.weatherIcon.Drizzle})
    break;
    case rangeID >= 500 && rangeID <= 531:
       this.setState({icon:this.weatherIcon.Rain})
    break;
    case rangeID >= 600 && rangeID <= 632:
       this.setState({icon:this.weatherIcon.Snow})
    break;
    case rangeID >= 700 && rangeID <= 781:
       this.setState({icon:this.weatherIcon.Atmosphere})
    break;
    case rangeID == 800 :
       this.setState({icon:this.weatherIcon.Clear})
    break;
    case rangeID >= 801 && rangeID <= 804:
       this.setState({icon:this.weatherIcon.Clouds})
    break;
    default:
      this.setState({icon:this.weatherIcon.Clouds})
  }
}
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}uk&appid=${API_KEY}`
    );
    const response = await api_call.json();

    // console.log(response);
    this.setState({
      city: `${response.name},${response.sys.country}`,
      celsius: this.calcullateCelsius(response.main.temp),
      temp_max:this.calcullateCelsius(response.main.temp_max),
      temp_min:this.calcullateCelsius(response.main.temp_min),
      description:response.weather[0].description,
    });
    this.get_weatherIcon(this.weatherIcon,response.weather[0].id)
  } else {
    this.setState({
      error:true
    })
  }
}
  render() {
    return (
      <div className="App">
        <FormCompo loadweather={this.getWeather} error={this.state.error}/>
        <Weth
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
