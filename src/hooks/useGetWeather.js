import { useState } from 'react';
import makeFirstLetterUppercase from '../helpers/makeFirstLetterUppercase';

export default function useGetWeather() {
  const [information, setInformation] = useState({
    basicInformation: {
      name: '',
      countryCode: '',
    },
    temperature: {
      current: '',
      min: '',
      max: '',
      feelsLike: '',
    },
    humidity: '',
    weatherDescription: '',
    pressure: '',
    weatherCode: '',
  });

  async function getCityInformation(latitude, longitude) {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=3&appid=${
      import.meta.env.VITE_OPENWEATHER_API_KEY
    }`;
    try {
      const response = await fetch(url);
      const cityInformation = await response.json();
      console.log(cityInformation);
      return { cityInformation };
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchWeather(latitude, longitude) {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const baseUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_OPENWEATHER_API_KEY
    }&units=metric`;
    try {
      const response = await fetch(baseUrl, options);
      const data = await response.json();
      const { cityInformation } = await getCityInformation(latitude, longitude);
      console.log(cityInformation);
      setInformation({
        ...information,
        basicInformation: {
          name: cityInformation[0].name,
          countryCode: cityInformation[0].country,
        },
        temperature: {
          current: `${Math.ceil(data.current.temp)}°`,
          min: `${Math.ceil(data.daily[0].temp.min)}°`,
          max: `${Math.ceil(data.daily[0].temp.max)}°`,
          feelsLike: `${Math.ceil(data.current.feels_like)}°`,
        },
        humidity: data.current.humidity,
        weatherDescription: makeFirstLetterUppercase(
          data.current.weather[0].description
        ),
        pressure: data.current.pressure,
        weatherCode: data.current.weather[0].id,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return { information, fetchWeather };
}
