import { requestWeather } from "../requests/requestWeather";
import { drawHeader } from "./drawHeader";
import { drawMap } from "./drawMap";

export async function drawSearchHistory(el, items, firstDrawing = false) {
  let history;

  if (firstDrawing) {
    history = document.createElement("footer");
    history.classList.add("field__search-history");
    history.classList.add("search-history");
  } else {
    history = el.querySelector(".field__search-history");
  }

  history.innerHTML = `
  <h2 class="search-history__title">История запросов</h2>
      <ol class='search-history__list list'>${items
        .map((elem) => `<li class='list__item'>${elem}</li>`)
        .join("")}</ol>`;

  if (firstDrawing) {
    el.insertAdjacentElement("beforeEnd", history);
  }

  const list = history.querySelector(".search-history__list");

  list.addEventListener("click", async (ev) => {
    if (ev.target.tagName === "LI") {
      const weather = await requestWeather(null, null, ev.target.textContent);

      drawHeader(el, weather);

      drawMap(el, weather);
    }
  });
}
