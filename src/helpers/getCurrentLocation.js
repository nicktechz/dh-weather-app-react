import { useEffect, useState } from 'react';

export default function getCurrentLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const options = {
    timeout: 5000,
    maximumAge: 0,
  };
  function success(position) {
    setUserLocation({
      ...userLocation,
      cityName: 'Ejemplo',
      country: 'CO',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  function error(err) {
    console.error(`ERROR ${err.code}: ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  return { userLocation };
}
