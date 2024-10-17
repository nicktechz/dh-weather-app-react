import WeatherCard from './components/WeatherCard';
import './Weather.css';
function Weather() {
  return (
    <div className="app-weather cloudy">
      <div className="clouds"></div>
      <WeatherCard />
    </div>
  );
}

export default Weather;
