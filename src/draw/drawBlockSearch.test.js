import { drawBlockSearch } from "./drawBlockSearch";

describe("drawBlockSearch", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  test("is a function", () => {
    expect(drawBlockSearch).toBeInstanceOf(Function);
  });

  test("check UI", () => {
    drawBlockSearch(el);

    expect(el.querySelector(".search__title").textContent).toBe(
      "Отправить запрос"
    );
    expect(el.querySelector(".query__input").getAttribute("placeholder")).toBe(
      "Название города..."
    );
    expect(el.querySelector(".query__button").textContent).toBe(
      "Узнать погоду"
    );
  });
});
