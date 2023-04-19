import ymaps from "ymaps";

export async function drawMap(el, weather, firstDrawing = false) {
  try {
    let fieldMap;
    if (firstDrawing) {
      fieldMap = document.createElement("div");

      fieldMap.classList.add("field__map");
      fieldMap.classList.add("map");
      fieldMap.id = "map";

      el.insertAdjacentElement("beforeEnd", fieldMap);
    } else {
      fieldMap = el.querySelector(".field__map");
      fieldMap.innerHTML = "";
    }

    const maps = await ymaps.load(
      `https://api-maps.yandex.ru/2.1/?apikey=${process.env.API_KEY_MAP}&lang=ru_RU`
    );

    const map = new maps.Map("map", {
      center: [Number(`${weather.coord.lat}`), Number(`${weather.coord.lon}`)],
      zoom: 7,
    });
  } catch (e) {
    console.log("Failed to load Yandex Maps", e);
  }
}
