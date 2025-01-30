export function camelToSnake(camelStr) {
  let result = camelStr.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("_").toLowerCase();
}
