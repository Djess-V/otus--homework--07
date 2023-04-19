import { requestWeather } from "./requests/requestWeather";
import { drawBlockSearch } from "./draw/drawBlockSearch";
import { drawMap } from "./draw/drawMap";
import { drawHeader } from "./draw/drawHeader";
import { drawSearchHistory } from "./draw/drawSearchHistory";
import { readFromStorage } from "./storage/readFromStorage";
import { saveInStorage } from "./storage/saveInStorage";

export async function getWeather(el) {
  try {
    // Определение местоположения пользователя.
    const responseGeo = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const geo = await responseGeo.json();

    const weather = await requestWeather(geo.latitude, geo.longitude);

    if (weather.cod === "404") {
      throw new Error(weather.message);
    }

    drawHeader(el, weather, true);

    drawBlockSearch(el);

    drawMap(el, weather, true);

    const items = await readFromStorage();

    drawSearchHistory(el, items, true);

    const button = el.querySelector(".query__button");

    button.addEventListener("click", async () => {
      try {
        const input = el.querySelector(".query__input");

        const value = input.value.trim();

        const allowed = /[\p{L}]/gu.test(value);

        input.value = "";

        if (!value || !allowed) {
          throw new Error("Введите корректные данные.");
        }

        const newWeather = await requestWeather(null, null, value);

        if (newWeather.cod === "404") {
          throw new Error(newWeather.message);
        }

        drawHeader(el, newWeather);

        drawMap(el, newWeather);

        if (!items.includes(value)) {
          if (items.length === 10) {
            items.shift();
          }
          items.push(value);

          drawSearchHistory(el, items);

          saveInStorage(items);
        }
      } catch (e) {
        const message = el.querySelector(".search__message");
        message.innerHTML = e.message;

        setTimeout(() => {
          message.innerHTML = "";
        }, 3000);
      }
    });
  } catch (e) {
    const fieldError = document.createElement("h2");
    fieldError.classList.add("field__error");

    fieldError.innerHTML = e.message;

    el.insertAdjacentElement("afterbegin", fieldError);
  }
}
