import { useRef, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './Weather.css';
function Weather() {
  const appRef = useRef();
  function changeWeatherColor(code) {
    const value = {
      class: '',
    };
    switch (code) {
      case code > 200 && code < 700:
        return (value.class = 'rainy');
      case code > 700 && code < 900:
        return (value.class = 'cloudy');
      default:
        value.class = 'cloudy';
    }

    appRef.current.classList.add(value.class);
  }

  return (
    <div className="app-weather" ref={appRef}>
      <div className="clouds"></div>
      <WeatherCard weatherColor={changeWeatherColor} />
    </div>
  );
}

export default Weather;
