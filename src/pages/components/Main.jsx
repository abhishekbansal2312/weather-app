import React from "react";
import Time from "./WeatherInfo";
import WeatherInfo from "./WeatherInfo";

export default function Main({ forecastData, cityData, timeData }) {
  return (
    <div className="min-h-screen border-2 border-zinc-800 text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 bg-white   p-6 text-gray-800">
          <Time />
        </div>
        <div className="md:w-2/3 bg-white  p-6 text-gray-800">
          <WeatherInfo />
        </div>
      </div>
    </div>
  );
}
