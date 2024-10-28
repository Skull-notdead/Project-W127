import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hehe from './assets/clouds.png';
import humidity2 from './assets/humidity.png';
import wind from './assets/wind.png';

const apiKey = 'd3f4e955a985d0e021a345bf9c724664';
const city = 'Hyderabad';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherData() {
  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    const temperature = weatherData.main.temp - 273.15; 
    const windspeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    return { temperature, windspeed, humidity }; 
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function Card() {
  const [weatherData, setWeatherData] = useState({ temperature: null, windspeed: null, humidity: null });

  useEffect(() => {
    getWeatherData().then((data) => {
      if (data) {
        setWeatherData(data);
      }
    });
  }, []);

  return (
    <div className='card'>
      <div>
        <input className='input' type="text" placeholder="Select the city name" />
      </div>
      <div className='weather'>
        <img src={Hehe} className='weaicon' alt="weather icon" />
        <h1 className='h1'>{weatherData.temperature !== null ? `${weatherData.temperature.toFixed(2)} °C` : 'Loading...'}</h1>
        <h2 className='city'>{city}</h2>
        <div className="details">
          <div className="col">
            <img src={humidity2} alt="humidity icon" className='lol' />
            <p className='hum'>Humidity</p>
            <p>{weatherData.humidity !== null ? `${weatherData.humidity}%` : 'Loading...'}</p>
          </div>
          <div className='col'>
            <img src={wind} alt="wind icon" className='hehe' />
            <p>speed{weatherData.windspeed !== null ? `${weatherData.windspeed} km/h` : 'Loading...'}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
