export async function readFromStorage() {
  let list;
  try {
    list = await JSON.parse(localStorage.getItem("list"));

    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}
