import { readStorage } from "./readStorage";

describe("readStorage", () => {
  test("is a function", () => {
    expect(readStorage).toBeInstanceOf(Function);
  });

  test("return is Array", async () => {
    localStorage.setItem("list", JSON.stringify([1, 2, 3, 4, 5]));

    const items = await readStorage();

    expect(items).toBeInstanceOf(Array);
    expect(items.length).toBe(5);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });

  test("not return is Array", async () => {
    localStorage.setItem("list", JSON.stringify("Hello, World!"));

    const items = await readStorage();

    expect(items).toBeInstanceOf(Array);
    expect(items.length).toBe(0);
    expect(items).toEqual([]);
  });
});
