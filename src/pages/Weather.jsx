import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import Main from "./components/Main";

export default function Weather() {
  const [cityData, setCityData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [timeData, setTimeData] = useState({});
  const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const apiforecast = {
    key: "38563a45e910840c283837a6959d2880",
    base: "https://api.openweathermap.org/data/2.5/forecast",
  };

  const handleSearch = async (query) => {
    try {
      const weatherResponse = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      if (!weatherResponse.ok) {
        console.log("Weather data not found");
        return;
      }
      const weatherData = await weatherResponse.json();
      console.log("Weather Data:", weatherData);
      setCityData(weatherData);

      if (weatherData.coord) {
        TimeNow(weatherData.coord.lat, weatherData.coord.lon);
        weatherForecast(weatherData.coord.lat, weatherData.coord.lon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const TimeNow = async (lat, lon) => {
    try {
      const timeResponse = await fetch(
        `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`
      );
      if (!timeResponse.ok) {
        console.log("Time data not found");
        return;
      }
      const timeData = await timeResponse.json();
      console.log("Time Data:", timeData);
      setTimeData(timeData); // Update state with time data
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  const weatherForecast = async (lat, lon) => {
    try {
      const forecastResponse = await fetch(
        `${apiforecast.base}?lat=${lat}&lon=${lon}&units=metric&APPID=${apiforecast.key}`
      );
      if (!forecastResponse.ok) {
        console.log("Forecast data not found");
        return;
      }
      const forecastData = await forecastResponse.json();
      console.log("Forecast Data:", forecastData);
      setForecastData(forecastData.list); // Update state with the forecast list
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  return (
    <div>
      <SearchBox handleSearch={handleSearch} />
      <Main
        forecastData={forecastData}
        cityData={cityData}
        timeData={timeData}
      />
    </div>
  );
}
