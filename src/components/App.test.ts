import { IWeather } from "../requests/reqWeather";
import App from "./App";
import Component from "./basic/Component";

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

describe("App", () => {
  let el: HTMLElement;
  let weather: IWeather;
  let weather2: IWeather;
  let weather3: IWeather;
  const items: Array<string> = ["Москва", "Саратов"];

  beforeEach(() => {
    el = document.createElement("div");

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

    weather2 = {
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
      name: "Москва",
    };

    weather3 = {
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
      name: "Саратов",
    };
  });

  it("is a class", () => {
    expect(App).toBeInstanceOf(Function);

    const app = new App(el);

    expect(app).toBeInstanceOf(Component);
  });

  it("check component rendering", async () => {
    const app = new App(el, { input: "", weather, items });

    await sleep(10);

    expect(el.querySelector(".description__city")?.innerHTML).toBe(`Вашингтон`);
    expect(el.querySelectorAll(".list__item")?.length).toBe(2);

    const input = el.querySelector(".query__input") as HTMLInputElement;

    expect(input.value).toBe(``);
  });

  it("change and click events check", async () => {
    const app = new App(el, { input: "", weather, items });

    await sleep(100);

    const input = el.querySelector(".query__input") as HTMLInputElement;

    input.value = "Москва";

    input.dispatchEvent(new window.Event("change"));

    await sleep(100);

    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => weather2 });

    const btn = el.querySelector(".query__button") as HTMLButtonElement;

    btn.click();

    await sleep(100);

    expect(el.querySelector(".description__city")?.innerHTML).toBe(`Москва`);
  });

  it("сheck the click event on the list", async () => {
    const app = new App(el, { input: "", weather, items });

    await sleep(100);

    const listItems = el.querySelectorAll(
      ".list__item"
    ) as NodeListOf<HTMLElement>;

    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => weather3 });

    listItems[1].dispatchEvent(new window.Event("click", { bubbles: true }));

    await sleep(100);

    expect(el.querySelector(".description__city")?.innerHTML).toBe(`Саратов`);
  });

  it("сhecking the error message output in case of an invalid", async () => {
    const app = new App(el, { input: "", weather, items });

    await sleep(100);

    const btn = el.querySelector(".query__button") as HTMLButtonElement;

    btn.click();

    await sleep(100);

    expect(el.querySelector(".search__message")?.innerHTML).toBe(
      `Введите корректные данные.`
    );
  });

  it("checking the error message output in case of incorrect input", async () => {
    const app = new App(el, { input: "", weather, items });

    await sleep(100);

    const listItems = el.querySelectorAll(
      ".list__item"
    ) as NodeListOf<HTMLElement>;

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => ({ cod: "404", message: "Ошибка запроса!" }),
    });

    listItems[1].dispatchEvent(new window.Event("click", { bubbles: true }));

    await sleep(100);

    expect(el.querySelector(".search__message")?.innerHTML).toBe(
      "Ошибка запроса!"
    );
  });
});
