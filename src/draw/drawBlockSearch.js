export function drawBlockSearch(el) {
  const search = document.createElement("div");
  search.classList.add("field__search");
  search.classList.add("search");

  search.innerHTML = `
   <h2 class="search__title">Отправить запрос</h2>
   <div class="search__query query">
     <input class="query__input" placeholder="Название города..." />
     <button class="query__button">Узнать погоду</button>
   </div>
   <p class="search__message"></p>`;

  el.insertAdjacentElement("beforeEnd", search);
}
