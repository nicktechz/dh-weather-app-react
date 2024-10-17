export default function getCurrentLocation() {
  const userInformationLocation = {
    latitude: null,
    longitude: null,
  };
  const options = {
    timeout: 5000,
    maximumAge: 0,
  };
  function success(position) {
    userInformationLocation.latitude = position.coords.latitude;
    userInformationLocation.longitude = position.coords.longitude;
  }
  function error(err) {
    console.error(`ERROR ${err.code}: ${err.message}`);
  }
  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return { userInformationLocation, getLocation };
}
