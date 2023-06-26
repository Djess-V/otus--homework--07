import ymaps from "ymaps";
import { drawYMap } from "./drawYMap";
import { IWeather } from "../requests/reqWeather";
import { API_KEY_MAP } from "../data/constants";

describe("drawYMap", () => {
  let el: HTMLElement;
  let weather: IWeather;

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
        lat: 37.751,
        lon: -97.822,
      },
      name: "Вашингтон",
    };

    el = document.createElement("div");
    el.id = "map";

    window.document.body.appendChild(el);
  });

  test("is a function", () => {
    expect(drawYMap).toBeInstanceOf(Function);
  });

  test("UI check on the first rendering", () => {
    drawYMap(weather);

    const map = document.getElementById("map") as HTMLElement;

    expect(map.innerHTML).not.toBeUndefined();
  });

  test("should fetch maps", () => {
    const load = jest.spyOn(ymaps, "load");

    drawYMap(weather);

    expect(load).toHaveBeenCalled();
    expect(load).toHaveBeenCalledWith(
      `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY_MAP}&lang=ru_RU`
    );
  });

  test("The map is rendered", async () => {
    const load = jest.spyOn(ymaps, "load");
    const options = {
      center: [Number(`${weather.coord.lat}`), Number(`${weather.coord.lon}`)],
      zoom: 7,
    };

    const maps = {
      Map(id, opt) {
        console.log(1);
      },
    };

    const map = jest.spyOn(maps, "Map");

    load.mockResolvedValue(maps);

    await drawYMap(weather);

    expect(map).toHaveBeenCalled();
    expect(map).toHaveBeenCalledWith("map", options);
  });

  test("the map request will be executed with an error", async () => {
    const log = jest.spyOn(window.console, "log");
    const load = jest.spyOn(ymaps, "load");

    load.mockRejectedValue(1);

    await drawYMap(weather);

    expect(log).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith("Failed to load Yandex Maps", 1);
  });
});
