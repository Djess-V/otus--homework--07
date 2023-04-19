import { readFromStorage } from "./readFromStorage";

describe("readFromStorage", () => {
  test("is a function", () => {
    expect(readFromStorage).toBeInstanceOf(Function);
  });

  test("return is Array", async () => {
    localStorage.setItem("list", JSON.stringify([1, 2, 3, 4, 5]));

    const items = await readFromStorage();

    expect(items).toBeInstanceOf(Array);
    expect(items.length).toBe(5);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });

  test("return is Array", async () => {
    localStorage.setItem("list", JSON.stringify("Hello, World!"));

    const items = await readFromStorage();

    expect(items).toBeInstanceOf(Array);
    expect(items.length).toBe(0);
    expect(items).toEqual([]);
  });
});
