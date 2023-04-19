import { requestWeather } from "./requestWeather";

describe("requestWeather", () => {
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
  });

  test("is a function", () => {
    expect(requestWeather).toBeInstanceOf(Function);
  });

  test("querying data with latitude and longitude", async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: () => weather });

    expect(await requestWeather("37.751", "-97.822")).toEqual(weather);
  });

  test("querying data with the city name", async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: () => weather });

    expect(await requestWeather(null, null, "Вашингтон")).toEqual(weather);
  });

  test("If an error occurs, the query will return {}", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => {
        throw new Error("");
      },
    });

    global.console.log = jest.fn();

    expect(await requestWeather()).toEqual({});
  });
});
