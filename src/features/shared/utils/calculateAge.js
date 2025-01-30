export function calculateAge(birthDateString) {
  if (!birthDateString) {
    return null;
  }

  let birthDate;
  if (typeof birthDateString === "number") {
    birthDate = new Date(birthDateString, 0, 1);
  } else {
    birthDate = new Date(birthDateString);
  }

  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
