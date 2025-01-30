export function snakeToCamel(snakeStr) {
  return snakeStr.replace(/(_\w)/g, function (match) {
    return match[1].toUpperCase();
  });
}
