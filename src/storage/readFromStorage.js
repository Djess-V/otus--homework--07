export async function readFromStorage() {
  const list = await JSON.parse(localStorage.getItem("list"));

  return list instanceof Array ? list : [];
}
