export function saveInStorage(items) {
  localStorage.setItem("list", JSON.stringify(items));
}
