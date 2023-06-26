import { reqLocation, ILocation } from "./reqLocation";

describe("reqLocation", () => {
  const geo: ILocation = {
    country: "United States",
    latitude: 37.751,
    longitude: -97.822,
    city: "Washington",
  };

  test("is a function", () => {
    expect(reqLocation).toBeInstanceOf(Function);
  });

  test("check function", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => geo });

    const location = await reqLocation();

    expect(location?.latitude).toBe(37.751);
    expect(location?.longitude).toBe(-97.822);
  });
});
