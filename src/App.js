import CurrentWeather from "./componenets/current-weather/CurrentWeather"
import './App.css';
import Search from './componenets/search/Search';
import { WEATHER_URL, WEATHER_API_KEY } from './Api';
import { useState } from "react";
import Forecast from "./componenets/forecast/Forecast";


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearch = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(error => console.log(error));

  }
  //  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleSearch} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
     {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
