import { useEffect } from 'react';
import useGetWeather from '../../hooks/useGetWeather';
import SearchForm from './SearchForm';
import getCurrentLocation from '../../helpers/getCurrentLocation';
import useLocalStorage from '../../hooks/useLocalStorage';

function WeatherCard() {
  const { weather, fetchWeather, isLoading } = useGetWeather();
  const { getUserLocation } = getCurrentLocation();
  const [userLatitude, setUserLatitude] = useLocalStorage('latitude', null);
  const [userLongitude, setUserLongitude] = useLocalStorage('longitude', null);
  const searchCity = (latitude, longitude) => {
    fetchWeather(latitude, longitude);
  };

  useEffect(() => {
    if (userLatitude && userLongitude) {
      getUserLocation()
        .then((response) => {
          if (
            userLatitude !== response.coords.latitude ||
            userLongitude !== response.coords.longitude
          ) {
            setUserLatitude(response.coords.latitude);
            setUserLongitude(response.coords.longitude);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (!userLatitude && !userLongitude) {
      getUserLocation()
        .then((response) => {
          setUserLatitude(response.coords.latitude);
          setUserLongitude(response.coords.longitude);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  useEffect(() => {
    if (userLatitude && userLongitude) {
      searchCity(userLatitude, userLongitude);
    }
  }, [userLatitude, userLongitude]);

  return (
    <div className="weather-box">
      <div className="weather-box-header">
        <div>
          <h2>
            {isLoading
              ? null
              : `${weather.basicInformation.name}, ${weather.basicInformation.countryCode}`}
          </h2>
          <h1 className="h1-lg">
            {isLoading ? '--' : weather.temperature.current}
          </h1>
          <h2>{isLoading ? null : weather.weatherDescription}</h2>
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
              {isLoading ? '--' : weather.temperature.feelsLike}
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
                : `${weather.temperature.min}/${weather.temperature.max}`}
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
              {isLoading ? '--' : weather.humidity}%
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
              {isLoading ? '--' : weather.pressure}hPa
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
