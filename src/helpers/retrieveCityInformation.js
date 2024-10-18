export default async function retrieveCityInformation(latitude, longitude) {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=3&appid=${
    import.meta.env.VITE_OPENWEATHER_API_KEY
  }`;
  try {
    const response = await fetch(url);
    const cityInformation = await response.json();

    return cityInformation;
  } catch (error) {
    console.error(error);
  }
}
