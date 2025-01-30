import numeral from "numeral";

export function formatSalary(value) {
  value = value.replace(/[^\d]/g, "");
  value = value.slice(0, 4);
  value = numeral(value).format("0,0");
  value = value.replace(",", ".");
  return value;
}
