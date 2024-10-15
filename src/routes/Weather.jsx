import Sidebar from './components/Sidebar';
import './Weather.css';
function Weather() {
  const urlOptions = {
    searchCity: 'Bogotá',
    appID: process.env.OPEN_WEATHER_API_KEY,
  };
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${urlOptions.searchCity}&appid=${urlOptions.appID}`;
  return (
    <div className="app-weather">
      <Sidebar />
      <div className="weather-box">
        <h1>Bogotá, Colombia</h1>
      </div>
    </div>
  );
}

export default Weather;
