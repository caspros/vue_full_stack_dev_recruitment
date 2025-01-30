export function calculateDuration(
  startDateStr,
  endDateStr,
  { stringify = false },
) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) {
    return stringify
      ? "End date is earlier than start date"
      : { years: 0, months: 0, days: 0 };
  }

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  let yearsDiff = endYear - startYear;
  let monthsDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
  let daysDiff = endDay - startDay;

  if (endMonth < startMonth || (endMonth === startMonth && endDay < startDay)) {
    yearsDiff--;
  }

  if (endDay < startDay) {
    monthsDiff--;
    const lastMonth = new Date(endYear, endMonth, 0);
    daysDiff += lastMonth.getDate();
  }

  if (stringify) {
    let resultString = "";
    if (yearsDiff > 0) resultString += `${yearsDiff} years, `;
    if (monthsDiff > 0) resultString += `${monthsDiff} months, `;
    if (daysDiff > 0) resultString += `${daysDiff} days`;
    resultString = resultString.replace(/, $/, "");
    return resultString;
  }

  return { years: yearsDiff, months: monthsDiff, days: daysDiff };
}
