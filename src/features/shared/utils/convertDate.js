export function convertDate(dateString) {
  let parts = dateString.split(".");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

export function toLocaleDate(date) {
  return new Date(date).toLocaleDateString();
}
