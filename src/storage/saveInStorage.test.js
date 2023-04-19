import { saveInStorage } from "./saveInStorage";

describe("saveInStorage", () => {
  test("is a function", () => {
    expect(saveInStorage).toBeInstanceOf(Function);
  });

  test("writes the data to localStorage", async () => {
    const items = [1, 2, 3, 4, 5];

    saveInStorage(items);

    const data = JSON.parse(localStorage.getItem("list"));

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(5);
    expect(data).toEqual([1, 2, 3, 4, 5]);
  });
});
