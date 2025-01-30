import { useI18n } from "vue-i18n";

export function formatDateToDayMonthYear(
  inputDate,
  {
    hour = false,
    onlyHour = false,
    toSend = false,
    yearShort = false,
    monthYearFormat = false,
  } = {},
) {
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  if (monthYearFormat) {
    const { t } = useI18n();
    const monthNames = [
      t("global.monthsOptions.january"),
      t("global.monthsOptions.february"),
      t("global.monthsOptions.march"),
      t("global.monthsOptions.april"),
      t("global.monthsOptions.may"),
      t("global.monthsOptions.june"),
      t("global.monthsOptions.july"),
      t("global.monthsOptions.august"),
      t("global.monthsOptions.september"),
      t("global.monthsOptions.october"),
      t("global.monthsOptions.november"),
      t("global.monthsOptions.december"),
    ];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${monthName} ${year}`;
  }

  if (toSend && !onlyHour) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  } else if (toSend && onlyHour) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  let dateString = "";

  if (!onlyHour) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();

    if (yearShort) {
      year = year.toString().slice(-2);
    }

    dateString = `${day}.${month}.${year}`;
  }

  if (hour || onlyHour) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    if (!onlyHour) {
      dateString += ", ";
    }
    dateString += `${hours}:${minutes}`;
  }

  return dateString;
}
