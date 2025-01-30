export function checkPluralForm(language, value) {
  if (value === 1) {
    return "singular";
  } else if (value > 1) {
    if (language === "de" || language === "en") {
      return "plural";
    } else if (language === "pl") {
      if (
        value % 10 >= 2 &&
        value % 10 <= 4 &&
        (value % 100 < 10 || value % 100 >= 20)
      ) {
        return "plural";
      } else {
        return "plural-extra";
      }
    }
  }
}
