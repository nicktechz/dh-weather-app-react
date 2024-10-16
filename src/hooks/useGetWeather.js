import { useState } from 'react';
import makeFirstLetterUppercase from '../helpers/makeFirstLetterUppercase';

export default function useGetWeather() {
  const [information, setInformation] = useState({
    city: '',
    country: '',
    temperature: {
      current: '',
      min: '',
      max: '',
      feelsLike: '',
    },
    humidity: '',
    weatherDescription: '',
    seaLevel: '',
    weatherCode: '',
  });

  async function fetchWeather(city) {
    const urlOptions = {
      searchCity: city,
      appID: import.meta.env.VITE_OPENWEATHER_API_KEY,
    };
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${urlOptions.searchCity}&appid=${urlOptions.appID}`;
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setInformation({
        ...information,
        city: data.name,
        country: data.sys.country,
        temperature: {
          current: `${Math.ceil(data.main.temp - 273.15)}°`,
          min: `${Math.ceil(data.main.temp_min - 273.15)}°`,
          max: `${Math.ceil(data.main.temp_max - 273.15)}°`,
          feelsLike: `${Math.ceil(data.main.feels_like - 273.15)}°`,
        },
        humidity: data.main.humidity,
        weatherDescription: makeFirstLetterUppercase(
          data.weather[0].description
        ),
        seaLevel: data.main.sea_level,
        weatherCode: data.weather[0].id,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return { information, fetchWeather };
}
