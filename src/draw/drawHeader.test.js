import { drawHeader } from "./drawHeader";

describe("drawHeader", () => {
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
    expect(drawHeader).toBeInstanceOf(Function);
  });

  test("UI check when parameters are normal", () => {
    drawHeader(el, weather, true);

    expect(el.querySelector(".description__city").textContent).toBe(
      "Вашингтон"
    );
    expect(el.querySelector(".description__temp").textContent).toBe("-273oC");
  });

  test("UI check when weather === {}", () => {
    drawHeader(el, {}, true);

    expect(el.querySelector(".initial__description").textContent).toBe(
      "Запрос выполнился с ошибкой. Попробуйте ещё раз."
    );
  });

  test("Checking the UI when rendering is not the first time", () => {
    el.innerHTML = `<div class='field__initial'></div>`;

    drawHeader(el, weather);

    expect(el.querySelector(".description__city").textContent).toBe(
      "Вашингтон"
    );
    expect(el.querySelector(".description__temp").textContent).toBe("-273oC");
    expect(el.querySelector(".initial__image").firstElementChild.src).toBe(
      "https://openweathermap.org/img/wn/02d@2x.png"
    );
  });
});
