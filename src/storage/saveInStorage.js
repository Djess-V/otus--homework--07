export async function saveInStorage(items) {
  try {
    localStorage.setItem("list", JSON.stringify(items));
  } catch (e) {
    console.log("Ошибка сохранения данных в localStorage");
  }
}
