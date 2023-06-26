export async function saveStorage(items: Array<string>) {
  try {
    localStorage.setItem("list", JSON.stringify(items));
  } catch (e) {
    console.log("Ошибка сохранения данных в localStorage");
  }
}
