export function isDateOlderThanToday(date) {
  return new Date(date) < new Date();
}

export function getLocaleDateString(date) {
  return new Date(date).toLocaleDateString();
}

export function getYearOfBirthOptions() {
  const to = new Date().getFullYear() - 60;
  const from = new Date().getFullYear() - 18;

  return Array.from({ length: from - to + 1 }).reduce((array, _, index) => {
    array.push(from - index);
    return array;
  }, []);
}
