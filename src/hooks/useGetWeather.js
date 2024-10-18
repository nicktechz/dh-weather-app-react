import { useState } from 'react';
import makeFirstLetterUppercase from '../helpers/makeFirstLetterUppercase';
import retrieveCityInformation from '../helpers/retrieveCityInformation';

export default function useGetWeather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchWeather(latitude, longitude) {
    setIsLoading(true);
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    };
    const baseUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_OPENWEATHER_API_KEY
    }&units=metric`;
    try {
      const cityInformation = await retrieveCityInformation(
        latitude,
        longitude
      );
      const response = await fetch(baseUrl, options);
      const data = await response.json();
      setWeather({
        ...weather,
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
      setIsLoading(false);
    } catch (error) {
      return console.error(error);
    }
  }
  return { weather, fetchWeather, isLoading };
}
