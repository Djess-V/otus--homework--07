import { requestWeather } from "./requests/requestWeather";
import { getWeather } from "./getWeather";

jest.mock("./requests/requestWeather");

describe("getWeather", () => {
  let el;
  let geo;
  let weather;
  let weatherMoscow;
  let weatherError;

  beforeEach(() => {
    el = document.createElement("section");
    el.id = "app";
    geo = {
      country: "United States",
      latitude: "37.751",
      longitude: "-97.822",
      city: "Washington",
    };

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
      name: "Washington",
    };

    weatherMoscow = {
      main: {
        temp: 273.15,
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
    };

    weatherError = {
      cod: "404",
      message: "city not found",
    };
  });

  test("is a function", () => {
    expect(getWeather).toBeInstanceOf(Function);
  });

  test("check UI", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => geo });

    requestWeather.mockResolvedValueOnce(weather);

    await getWeather(el);

    expect(el.querySelector(".description__city")).toBeInstanceOf(HTMLElement);
    expect(el.querySelector(".search-history__title").textContent).toBe(
      "История запросов"
    );
  });

  test("button action check", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => geo });

    requestWeather.mockResolvedValueOnce(weather);

    await getWeather(el);

    requestWeather.mockImplementation(() => weatherMoscow);

    const button = el.querySelector(".query__button");
    const input = el.querySelector(".query__input");

    input.value = "  Moscow  ";
    await button.click();

    expect(el.querySelector(".description__city").innerHTML).toBe("Moscow");
  });

  test("city not found", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => geo });

    requestWeather.mockResolvedValueOnce(weather);

    await getWeather(el);

    requestWeather.mockImplementation(() => weatherError);

    const button = el.querySelector(".query__button");
    const input = el.querySelector(".query__input");

    input.value = "  JHJHJHka  ";
    await button.click();

    expect(el.querySelector(".search__message").innerHTML).toBe(
      "city not found"
    );
  });

  test("Invalid data entered into the input", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => geo });

    requestWeather.mockResolvedValueOnce(weather);

    await getWeather(el);

    const button = el.querySelector(".query__button");
    const input = el.querySelector(".query__input");

    input.value = "              ";
    await button.click();

    expect(el.querySelector(".search__message").innerHTML).toBe(
      "Введите корректные данные."
    );
  });

  test("requestWeather() will return an error", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => geo });

    requestWeather.mockRejectedValue(new Error("Что-то пошло не так!"));

    await getWeather(el);

    expect(el.querySelector(".field__error").innerHTML).toBe(
      "Что-то пошло не так!"
    );
  });

  test("Invalid data entered into the input", async () => {
    const cities = [
      "Москва",
      "Лондон",
      "Воронеж",
      "Киев",
      "Вашингтон",
      "Саратов",
      "Минск",
      "Каир",
      "Стамбул",
      "Пекин",
      "Красноярск",
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => geo });

    requestWeather.mockResolvedValue(weather);

    await getWeather(el);

    const button = el.querySelector(".query__button");
    const input = el.querySelector(".query__input");

    for (let i = 0; i <= cities.length; i += 1) {
      input.value = cities[i];
      await button.click();
    }

    expect(el.querySelectorAll(".list__item").length).toBe(10);
    expect(el.querySelectorAll(".list__item")[0].textContent).toBe("Воронеж");
  });
});
