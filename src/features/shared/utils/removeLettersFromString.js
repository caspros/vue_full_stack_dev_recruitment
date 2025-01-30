export function removeLettersFromString(str) {
  const regex = /[a-zA-Z]/g;
  return str.replace(regex, "");
}
