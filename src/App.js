import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeatherData(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=cc1ae953a04c4ca6abb142957253010&q=${city}`
      );
      if (!res.ok) throw new Error("Invalid city");
      const data = await res.json();
      setWeatherData(data);
    } catch {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading data...</p>}

      <div className="weather-cards">
        {weatherData && (
          <>
            <div className="weather-card">Temperature: {weatherData.current.temp_c}°C</div>
            <div className="weather-card">Humidity: {weatherData.current.humidity}%</div>
            <div className="weather-card">Condition: {weatherData.current.condition.text}</div>
            <div className="weather-card">Wind Speed: {weatherData.current.wind_kph} km/h</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

