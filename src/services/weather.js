import retrieveCityInformation from './location';

export async function fetchWeather(latitude, longitude) {
  if(latitude === null || longitude === null) {
    latitude = 40.71427;
    longitude = -74.00597;
  }
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  };
  const baseUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${
    import.meta.env.VITE_OPENWEATHER_API_KEY
  }&units=metric`;
  try {
    console.log(latitude, longitude);
    const cityInformation = await retrieveCityInformation(latitude, longitude);
    const response = await fetch(baseUrl, options);
    const data = await response.json();
    return { ...data, cityInformation };
  } catch (error) {
    return error;
  }
}
