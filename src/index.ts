import { reqLocation } from "./requests/reqLocation";
import { reqWeather, IWeather } from "./requests/reqWeather";
import { readStorage } from "./storage/readStorage";
import { drawYMap } from "./draw/drawYMap";
import App from "./components/App";
import "./style/style.css";

(async function f() {
  try {
    const location = await reqLocation();

    let weather: IWeather = {};

    if (location) {
      weather = await reqWeather(location.latitude, location.longitude);
    }

    const items = await readStorage();

    const elApp = document.getElementById("app") as HTMLDivElement;

    const app = new App(elApp, {
      input: "",
      items,
      weather,
    });

    setTimeout(() => {
      drawYMap(weather);
    }, 10);
  } catch (e) {
    console.log(e);
  }
})();
