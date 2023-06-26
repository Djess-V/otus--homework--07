export async function readStorage() {
  let list: Array<string> = [];
  const listStr = localStorage.getItem("list");

  if (listStr) {
    const parseList = await JSON.parse(listStr);

    if (parseList instanceof Array) {
      list = parseList;
    }
  }

  return list;
}
