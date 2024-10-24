import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import getCurrentLocation from '../../helpers/getCurrentLocation';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useGetWeather } from '../../hooks/useGetWeather';
import makeFirstLetterUppercase from '../../helpers/makeFirstLetterUppercase';

function WeatherCard() {
  const { getUserLocation } = getCurrentLocation();
  const [latitude, setLatitude] = useLocalStorage('latitude', null);
  const [longitude, setLongitude] = useLocalStorage('longitude', null);
  const { data: weather, isLoading } = useGetWeather(latitude, longitude);

  const searchCity = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    if (latitude && longitude) {
      getUserLocation()
        .then((response) => {
          if (
            latitude !== response.coords.latitude ||
            longitude !== response.coords.longitude
          ) {
            setLatitude(response.coords.latitude);
            setLongitude(response.coords.longitude);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (!latitude && !longitude) {
      getUserLocation()
        .then((response) => {
          setLatitude(response.coords.latitude);
          setLongitude(response.coords.longitude);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="weather-box">
      <div className="weather-box-header">
        <div>
          <h2>
            {isLoading
              ? null
              : `${weather?.cityInformation[0].name}, ${weather?.cityInformation[0].country}`}
          </h2>
          <h1 className="h1-lg">
            {isLoading ? '--' : Math.round(weather?.current.temp)}
          </h1>
          <h2>
            {isLoading
              ? null
              : makeFirstLetterUppercase(
                  weather?.current.weather[0].description
                )}
          </h2>
        </div>
        <SearchForm onSubmit={searchCity} />
      </div>
      <div className="cards-information">
        <div className="card">
          <div className="card-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cecece"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
            </svg>
            <h4 className="card-title">Feels like</h4>
          </div>
          <div className="card-body">
            <span className="card-number">
              {isLoading ? '--' : Math.round(weather?.current.feels_like)}
            </span>
          </div>
          <div className="card-footer">
            <span>Similar to the actual temperature</span>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cecece"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
            <h4 className="card-title">Min/Max Temperature</h4>
          </div>
          <div className="card-body">
            <span className="card-number">
              {isLoading
                ? '--'
                : `${Math.round(weather?.daily[0].temp.min)}/${Math.round(
                    weather?.daily[0].temp.max
                  )}`}
            </span>
          </div>
          <div className="card-footer">
            <span>Min/max temperature in the last hour</span>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cecece"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <h4 className="card-title">Humidity</h4>
          </div>
          <div className="card-body">
            <span className="card-number">
              {isLoading ? '--' : weather?.current.humidity}%
            </span>
          </div>
          <div className="card-footer">
            <span>Average for the week</span>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cecece"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="3"></circle>
              <line x1="12" y1="22" x2="12" y2="8"></line>
              <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
            </svg>
            <h4 className="card-title">Atmospheric Pressure</h4>
          </div>
          <div className="card-body">
            <span className="card-number">
              {isLoading ? '--' : weather?.current.pressure}hPa
            </span>
          </div>
          <div className="card-footer">
            <span>This measurement is at the sea level</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
