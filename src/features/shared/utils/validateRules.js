import { defineRule } from "vee-validate";
import i18n from "@/src/assets/config.js";

defineRule("required", value => {
  if (value && value.originalEvent) {
    value = value.value;
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? true : i18n.global.t("rules.thisFieldIsRequired");
  } else {
    return !value && value !== false && value !== 0
      ? i18n.global.t("rules.thisFieldIsRequired")
      : true;
  }
});

defineRule("minLength", (value, [limit]) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `This field should have at least ${limit} characters`;
    // return i18n.global.t("rules.atLeast", { limit: limit });
  }
  return true;
});

defineRule("maxLength", (value, [limit]) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length > limit) {
    return `This field cannot have more than ${limit} characters`;
  }
  return true;
});

defineRule("minMax", (value, [min, max]) => {
  if (!value) {
    return true;
  }
  const numericValue = Number(value);
  if (numericValue < min) {
    return `This field must be greater than ${min}`;
  }
  if (numericValue > max) {
    return `This field must be less than ${max}`;
  }
  return true;
});

defineRule("email", value => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value && !emailPattern.test(value)) {
    return "This is not correct e-mail address";
  }

  return true;
});

defineRule("notPast", value => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inputDate = new Date(value);
  inputDate.setHours(0, 0, 0, 0);

  if (today > inputDate) {
    return "Date can't be earlier than today";
  }

  return true;
});
