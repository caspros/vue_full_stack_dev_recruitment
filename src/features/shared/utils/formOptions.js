function t(key) {
  return key;
}

export const GENDERS = [
  { value: "male", label: t("global.male") },
  { value: "female", label: t("global.female") },
];

export const GENDERS_WITH_ANY = [
  { value: null, label: t("global.any") },
  ...GENDERS,
];

export const GENDERS_WITH_All = [
  { value: "all", label: t("global.any") },
  ...GENDERS,
];

export const WEIGHT_RANGES = [
  { value: "40-50", label: "40-50" },
  { value: "51-60", label: "51-60" },
  { value: "61-70", label: "61-70" },
  { value: "71-80", label: "71-80" },
  { value: "81-90", label: "81-90" },
  { value: "91-100", label: "91-100" },
  { value: "> 100", label: "> 100" },
];

export const HEIGHT_RANGES = [
  { value: "140-150", label: "140-150" },
  { value: "151-160", label: "151-160" },
  { value: "161-170", label: "161-170" },
  { value: "171-180", label: "171-180" },
  { value: "181-190", label: "181-180" },
  { value: "190+", label: "190+" },
];

export const VACATION_STATUSES = [
  { value: "no", label: t("global.no") },
  { value: "min_1", label: t("global.min1") },
  { value: "min_2", label: t("global.min2") },
  { value: "min_3", label: t("global.min3") },
  { value: "min_4", label: t("global.min4") },
  { value: "min_5", label: t("global.min5") },
];

export const SCHOOL_DEGREES = [
  { value: "general", label: t("global.general") },
  { value: "professional", label: t("global.professional") },
  { value: "high_school", label: t("global.high_school") },
  { value: "studies", label: t("global.studies") },
];

export const YES_NO = [
  { value: "no", label: t("global.no") },
  { value: "yes", label: t("global.yes") },
];

export const YES_NO_ANY = [{ value: null, label: t("global.any") }, ...YES_NO];

export const TRUE_FALSE = [
  { value: false, label: t("global.no") },
  { value: true, label: t("global.yes") },
];

export const TRUE_FALSE_ANY = [
  { value: null, label: t("global.any") },
  ...TRUE_FALSE,
];

export const LANGUAGE_GERMAN = [
  { value: "level_0", label: t("global.languageGermanOptions.level_0") },
  { value: "level_1", label: t("global.languageGermanOptions.level_1") },
  { value: "level_2", label: t("global.languageGermanOptions.level_2") },
  { value: "level_3", label: t("global.languageGermanOptions.level_3") },
  { value: "level_4", label: t("global.languageGermanOptions.level_4") },
];

export const DRIVING_LICENCES = [
  { value: "no", label: t("global.drivingLicenseOptions.no") },
  {
    value: "yes_automatic_manual",
    label: t("global.drivingLicenseOptions.yes_automatic_manual"),
  },
  {
    value: "yes_automatic",
    label: t("global.drivingLicenseOptions.yes_automatic"),
  },
  { value: "yes_manual", label: t("global.drivingLicenseOptions.yes_manual") },
];

export const EXPIRENCE_YEARS = [
  { value: null, label: t("global.none") },
  { value: 1, label: t("1") },
  { value: 2, label: t("2") },
  { value: 3, label: t("3") },
  { value: 4, label: t("4") },
  { value: 5, label: t("5") },
];

export const JOB_ORDER_BY = [
  {
    label: "global.sortOptions.activity",
    value: "activity",
  },
  {
    label: "global.sortOptions.startDate",
    value: "start_date",
  },
  {
    label: "global.sortOptions.bestPrice",
    value: "best_price",
  },
];

export const REQUESTS_ORDER_BY = [
  { value: "arrival", label: t("global.arrival") },
  { value: "newest", label: t("global.newest") },
  { value: "best_price", label: t("global.bestPrice") },
];

export const PLUS_DAYS = Array.from({ length: 14 }, (_, i) => i + 1);

export const NUMBER_OF_PATIENTS = [
  { value: "not_important", label: t("global.not_important") },
  { value: 1, label: t("1") },
  { value: 2, label: t("2") },
];

export const DEMENTIA_OPTIONS = [
  {
    value: "not_important",
    label: t("global.patientsDementiaOptions.not_important"),
  },
  {
    value: "no",
    label: t("global.patientsDementiaOptions.no"),
  },
  {
    value: "yes",
    label: t("global.patientsDementiaOptions.yes"),
  },
];

export const NIGHT_OPERATIONS = [
  {
    value: "not_important",
    label: t("global.any"),
  },
  {
    value: "no",
    label: t("global.nightOperationsOptions.no"),
  },
  {
    value: "up_to_1_time",
    label: t("global.nightOperationsOptions.up_to_1_time"),
  },
  {
    value: "1_2_times",
    label: t("global.nightOperationsOptions.1_2_times"),
  },
  {
    value: "more_than_2",
    label: t("global.nightOperationsOptions.more_than_2"),
  },
];

export const NIGHT_OPERATIONS_ANY = [
  {
    value: null,
    label: t("global.any"),
  },
  ...NIGHT_OPERATIONS,
];

export const OTHER_PERSON = [
  {
    value: "not_important",
    label: t("global.otherPersonsInHouseholdOptions.not_important"),
  },
  { value: "no", label: t("global.otherPersonsInHouseholdOptions.no") },
  { value: "yes", label: t("global.otherPersonsInHouseholdOptions.yes") },
];

export const OTHER_PERSON_FILTERS = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export const OTHER_PERSON_ANY = [
  {
    value: null,
    label: t("global.any"),
  },
  ...OTHER_PERSON,
];

export const ACCOMMODATIONS = [
  {
    icon: "zuhause_1",
    value: "single_family_house",
    label: t("global.accommodations.single_family_house"),
  },
  {
    icon: "zuhause_1",
    value: "multi_family_house",
    label: t("global.accommodations.multi_family_house"),
  },
  {
    icon: "wohnung_1",
    value: "apartment",
    label: t("global.accommodations.apartment"),
  },
  {
    icon: "wohnung_1",
    value: "other",
    label: t("global.accommodations.other"),
  },
];

export const PETS = [
  { value: "not_important", label: t(`global.petsOptions.no_allt_important`) },
  { value: "no", label: t(`global.petsOptions.no_all`) },
  { value: "yes", label: t(`global.petsOptions.yes`) },
];

export const CUSTOMER_CAREGIVERS_FILTERS = [
  { value: "unprocessed", label: t(`customer.unprocessed`) },
  { value: "like", label: t(`customer.iLike`) },
  { value: "likes_me", label: t(`customer.likesMe`) },
];

export const SMOKER = [
  { value: "not_important", label: t(`global.petsOptions.not_important`) },
  { value: "no", label: t(`global.petsOptions.no`) },
  { value: "yes", label: t(`global.petsOptions.yes`) },
];

export const CARE_LEVEL = [
  { value: null, label: t(`None`) },
  { value: 1, label: t(`1`) },
  { value: 2, label: t(`2`) },
  { value: 3, label: t(`3`) },
  { value: 4, label: t(`4`) },
  { value: 5, label: t(`5`) },
];
