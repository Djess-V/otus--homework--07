import { API_KEY_WEATHER } from "../data/constants";

export interface IWeather {
  [key: string]: any;
  cod?: string;
  message?: string;
}

export async function reqWeather(
  latitude: number | null,
  longitude: number | null,
  cityName: null | string = null
) {
  let weather: IWeather = {};
  try {
    let response;

    if (cityName) {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY_WEATHER}`
      );

      weather = await response.json();
    } else {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}`
      );

      weather = await response.json();
    }

    if (weather.main && "temp" in weather.main) {
      weather.main.temp = Math.trunc(Number(weather.main.temp) - 273.15);
    }

    return weather;
  } catch (e) {
    return {
      cod: "404",
      message: e.message,
    };
  }
}
