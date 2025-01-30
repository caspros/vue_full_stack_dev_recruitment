export function getWeeksAndDays(numberOfDays) {
  const weeks = Math.floor(numberOfDays / 7);
  const days = numberOfDays % 7;

  return {
    weeks: weeks,
    days: days,
  };
}

export function getWeeksAndDaysTextFromObject({ weeks, days }) {
  let text = "";

  if (weeks === 1) {
    text += "1 week";
  } else if (weeks > 1) {
    text += `${weeks} weeks`;
  }

  if (weeks > 0 && days > 0) {
    text += " ";
  }

  if (days === 1) {
    text += "1 day";
  } else if (days > 1) {
    text += `${days} days`;
  }

  return text;
}

export function getWeeksAndDaysText(numberOfDays) {
  const { weeks, days } = getWeeksAndDays(numberOfDays);

  return getWeeksAndDaysTextFromObject({ weeks, days });
}
