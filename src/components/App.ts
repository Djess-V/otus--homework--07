import Component from "./basic/Component";
import { drawYMap } from "../draw/drawYMap";
import { IWeather, reqWeather } from "../requests/reqWeather";
import { saveStorage } from "../storage/saveStorage";
import { templater } from "../templater/Templater";

export default class App extends Component {
  async handlerClickButton() {
    try {
      if (!("input" in this.state)) {
        throw new Error();
      }

      if (typeof this.state.input !== "string") {
        throw new Error();
      }

      if (!this.state.input) {
        throw new Error("Введите корректные данные.");
      }

      const newWeather = await reqWeather(null, null, this.state.input);

      if (newWeather.cod === "404") {
        throw new Error(newWeather.message);
      }

      if (
        "items" in this.state &&
        this.state.items instanceof Array &&
        !this.state.items.includes(this.state.input)
      ) {
        if (this.state.items.length === 10) {
          this.state.items.shift();
        }
        this.state.items.push(this.state.input);

        saveStorage(this.state.items);
      }

      this.setState({ input: "", weather: newWeather });

      setTimeout(() => {
        drawYMap(newWeather);
      }, 10);
    } catch (e) {
      const message = this.el.querySelector(".search__message") as HTMLElement;

      message.innerHTML = e.message;

      setTimeout(() => {
        message.innerHTML = "";
      }, 3000);
    }
  }

  handlerChangeInput(ev: Event) {
    this.setState({
      input: (ev.target as HTMLInputElement).value,
    });
  }

  async handlerClickHistory(ev: Event) {
    try {
      const target = ev.target as HTMLElement;

      if (target.tagName === "LI") {
        const weather = await reqWeather(null, null, target.textContent);

        if (weather.cod === "404") {
          throw new Error(weather.message);
        }

        this.setState({ weather });

        setTimeout(() => {
          drawYMap(weather);
        }, 10);
      }
    } catch (e) {
      const message = this.el.querySelector(".search__message") as HTMLElement;

      message.innerHTML = e.message;

      setTimeout(() => {
        message.innerHTML = "";
      }, 3000);
    }
  }

  events = {
    "click@button.query__button": this.handlerClickButton,
    "change@input.query__input": this.handlerChangeInput,
    "click@ol.list": this.handlerClickHistory,
  };

  render() {
    return templater.compile(
      `<header class="field__initial initial">
      <div class="initial__description description">
      <h3 class="description__city">{{weather.name}}</h3>
      <h3 class="description__temp">{{weather.main.temp}}<sup>o</sup>C</h3></div>
      <div class="initial__image image">
      <img src="https://openweathermap.org/img/wn/{{weather.weather[0].icon}}@2x.png" alt="Иконка">
      </div>
      </header>
      <div class="field__search search">
      <h2 class="search__title">Отправить запрос</h2>
      <div class="search__query query">
      <input class="query__input" placeholder="Название города..." value="{{input}}" />
      <button class="query__button">Узнать погоду</button></div>
      <p class="search__message"></p>
      </div>
      <div class="field__map map" id="map"></div>
      <footer class="field__search-history search-history">
      <h2 class="search-history__title">История запросов</h2>
      <ol class="search-history__list list">{{for items}}<li class="list__item">{{item}}</li>{{endfor}}</ol>
      </footer>
    `,
      this.state
    );
  }
}
