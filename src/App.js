import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Import images
import sunnyImage from './images/sunny.jpeg';
import cloudyImage from './images/cloudy.jpeg';
import rainyImage from './images/rainy.jpeg';
import hazeImage from './images/haze.jpg'; // Import haze image
import clearSky from './images/clearsky.jpg';
import snowImage from './images/snow.jpg';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  // Determine background image based on weather
  let backgroundImage = '';
  if (weather) {
    const mainWeather = weather.weather[0].main.toLowerCase();
    if (mainWeather.includes('clear')) {
      backgroundImage = clearSky; // Use clear sky image
    } else if (mainWeather.includes('rain')) {
      backgroundImage = rainyImage; // Use imported image
    } else if (mainWeather.includes('cloud')) {
      backgroundImage = cloudyImage; // Use imported image
    } else if (mainWeather.includes('haze')) {
      backgroundImage = hazeImage; // Use imported haze image
    } else if (mainWeather.includes('snow')) {
      backgroundImage = snowImage; // Use imported snow image
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', margin: '20px', fontSize: '16px' }}
      />
      <button onClick={getWeather} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Get Weather
      </button>

      {error && <p style={{ color: 'red', fontSize: '18px' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h3>Weather in {weather.name}, {weather.sys.country}</h3>
          <p><strong>Coordinates:</strong> Longitude: {weather.coord.lon}, Latitude: {weather.coord.lat}</p>
          <p><strong>Temperature:</strong> {weather.main.temp}°C (Feels like: {weather.main.feels_like}°C)</p>
          <p><strong>Min Temperature:</strong> {weather.main.temp_min}°C, Max Temperature: {weather.main.temp_max}°C</p>
          <p><strong>Weather:</strong> {weather.weather[0].main} - {weather.weather[0].description}</p>
          <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
          <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
