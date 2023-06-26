import { saveStorage } from "./saveStorage";

describe("saveStorage", () => {
  test("is a function", () => {
    expect(saveStorage).toBeInstanceOf(Function);
  });

  test("writes the data to localStorage", async () => {
    const items = ["Москва", "Воронеж", "Киров"];

    saveStorage(items);

    const strItems = localStorage.getItem("list");

    let data: any;

    if (strItems) {
      data = JSON.parse(strItems);
    }

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(3);
    expect(data).toEqual(["Москва", "Воронеж", "Киров"]);
  });
});
