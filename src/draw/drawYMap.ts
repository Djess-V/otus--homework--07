import ymaps from "ymaps";
import { IWeather } from "../requests/reqWeather";
import { API_KEY_MAP } from "../data/constants";

export async function drawYMap(weather: IWeather) {
  try {
    const maps = await ymaps.load(
      `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY_MAP}&lang=ru_RU`
    );

    const map = new maps.Map("map", {
      center: [Number(`${weather.coord.lat}`), Number(`${weather.coord.lon}`)],
      zoom: 7,
    });
  } catch (e) {
    console.log("Failed to load Yandex Maps", e);
  }
}
