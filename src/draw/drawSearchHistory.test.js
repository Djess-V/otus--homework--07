import { drawMap } from "./drawMap";
import { drawHeader } from "./drawHeader";
import { requestWeather } from "../requests/requestWeather";
import { drawSearchHistory } from "./drawSearchHistory";

jest.mock("../requests/requestWeather");
jest.mock("./drawMap");
jest.mock("./drawHeader");

describe("drawSearchHistory", () => {
  let el;
  let items;
  let weather;

  beforeEach(() => {
    items = ["Москва", "Киев", "Берлин"];
    el = document.createElement("section");
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
      name: "Moscow",
      country: "Russia",
    };
  });

  test("is a function", () => {
    expect(drawSearchHistory).toBeInstanceOf(Function);
  });

  test("UI check on the first rendering", () => {
    drawSearchHistory(el, items, true);

    expect(el.querySelectorAll(".list__item").length).toBe(3);
  });

  test("when clicking on an item in the list", () => {
    requestWeather.mockReturnValue(weather);
    drawHeader.mockReturnValue();
    drawMap.mockReturnValue();

    drawSearchHistory(el, items, true);

    el.querySelectorAll(".list__item")[0].click();

    expect(requestWeather).toHaveBeenCalledTimes(1);
  });

  test("checking the UI in subsequent drawings", async () => {
    const history = document.createElement("footer");
    history.classList.add("field__search-history");
    history.classList.add("search-history");

    el.insertAdjacentElement("beforeEnd", history);

    await drawSearchHistory(el, items);

    expect(el.querySelector(".field__search-history")).not.toBeNull();
  });
});
