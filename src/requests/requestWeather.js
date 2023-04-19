export async function requestWeather(latitude, longitude, cityName = null) {
  let weather = {};
  try {
    let response;

    if (cityName) {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY_WEATHER}`
      );

      weather = await response.json();
    } else {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY_WEATHER}`
      );

      weather = await response.json();
    }

    return weather;
  } catch (e) {
    console.log(e);
    return weather;
  }
}
