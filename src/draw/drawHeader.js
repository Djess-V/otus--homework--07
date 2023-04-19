export function drawHeader(el, weather, firstDrawing = false) {
  let header;

  try {
    if (firstDrawing) {
      header = document.createElement("header");
      header.classList.add("field__initial");
      header.classList.add("initial");
    } else {
      header = el.querySelector(".field__initial");
    }

    const emptyObject = JSON.stringify(weather) === "{}"; // Object.keys().length === 0

    header.innerHTML = "";

    if (emptyObject) {
      header.innerHTML = `
      <div class="initial__description 
      description">Запрос выполнился с ошибкой. Попробуйте ещё раз.</div>`;
    } else {
      header.innerHTML = `<div class="initial__description description">
      <h3 class='description__city'>${weather?.name}</h3>
      <h3 class='description__temp'>${Math.trunc(
        weather?.main?.temp - 273.15
      )}<sup>o</sup>C</h3></div>
      <div class="initial__image image">
      <img src='https://openweathermap.org/img/wn/${
        weather?.weather?.[0]?.icon
      }@2x.png' alt='Иконка' />
      </div>`;
    }
    if (firstDrawing) {
      el.insertAdjacentElement("afterBegin", header);
    }
  } catch (e) {
    header.innerHTML = `${e.message}`;
  }
}
