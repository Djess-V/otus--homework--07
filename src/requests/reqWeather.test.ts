import { reqWeather, IWeather } from "./reqWeather";

describe("reqWeather", () => {
  let weather: IWeather;

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
        lat: 37.751,
        lon: -97.822,
      },
      name: "Вашингтон",
    };
  });

  test("is a function", () => {
    expect(reqWeather).toBeInstanceOf(Function);
  });

  test("querying data with latitude and longitude", async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: () => weather });

    expect(await reqWeather(37.751, -97.822)).toEqual(weather);
  });

  test("querying data with the city name", async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: () => weather });

    expect(await reqWeather(null, null, "Вашингтон")).toEqual(weather);
  });
});
