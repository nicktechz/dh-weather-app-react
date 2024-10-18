export default function getCurrentLocation() {
  function getUserLocation() {
    return new Promise((response, reject) => {
      navigator.geolocation.getCurrentPosition(response, reject, {
        maximumAge: Infinity,
        timeout: 10000,
      });
    });
  }
  return { getUserLocation };
}
