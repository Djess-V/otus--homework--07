import ymaps from "ymaps";
import { drawMap } from "./drawMap";

describe("drawMap", () => {
  let el;
  let weather;

  beforeEach(() => {
    weather = {
      main: {
        temp: 0,
      },
      weather: [
        {
          icon: "02d",
        },
      ],
      coord: {
        lat: "37.751",
        lon: "-97.822",
      },
      name: "Вашингтон",
    };
    el = document.createElement("section");
  });

  test("is a function", () => {
    expect(drawMap).toBeInstanceOf(Function);
  });

  test("UI check on the first rendering", () => {
    drawMap(el, weather, true);

    expect(el.querySelector(".field__map").innerHTML).not.toBeUndefined();
  });

  test("checking the UI in subsequent drawings", () => {
    const map = document.createElement("div");

    map.classList.add("field__map");
    map.classList.add("map");
    map.id = "map";

    el.insertAdjacentElement("beforeEnd", map);

    drawMap(el, weather);

    expect(el.querySelector(".field__map").innerHTML).not.toBeUndefined();
  });

  test("should fetch maps", () => {
    const load = jest.spyOn(ymaps, "load");

    drawMap(el, weather, true);

    expect(load).toHaveBeenCalled();
    expect(load).toHaveBeenCalledWith(
      `https://api-maps.yandex.ru/2.1/?apikey=${process.env.API_KEY_MAP}&lang=ru_RU`
    );
  });

  test("The map is rendered", async () => {
    const load = jest.spyOn(ymaps, "load");
    const options = {
      center: [Number(`${weather.coord.lat}`), Number(`${weather.coord.lon}`)],
      zoom: 7,
    };

    const maps = {
      Map(id, opt) {},
    };

    const map = jest.spyOn(maps, "Map");

    load.mockResolvedValue(maps);

    await drawMap(el, weather, true);

    expect(map).toHaveBeenCalled();
    expect(map).toHaveBeenCalledWith("map", options);
  });

  test("the map request will be executed with an error", async () => {
    const log = jest.spyOn(window.console, "log");
    const load = jest.spyOn(ymaps, "load");

    load.mockRejectedValue(1);

    await drawMap(el, weather, true);

    expect(log).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith("Failed to load Yandex Maps", 1);
  });
});
