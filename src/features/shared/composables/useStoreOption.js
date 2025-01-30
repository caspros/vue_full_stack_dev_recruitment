import { computed } from "vue";
import { useSharedStore } from "../store.js";
import { useI18n } from "vue-i18n";

export function useNumberOfPatientsOptions() {
  const numberOfPatientsOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "numberOfPatients" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push(storeData[i]);
    }
    return options;
  });

  return { numberOfPatientsOptions };
}

export function useStoreOptions() {
  const storeShared = useSharedStore();

  const { t } = useI18n();

  const accommodationOptions = computed(() => [
    {
      value: "single_family_house",
      label: t(`global.accommodations.single_family_house`),
    },
    {
      value: "apartment",
      label: t(`global.accommodations.apartment`),
    },
    {
      value: "other",
      label: t(`global.accommodations.other`),
    },
  ]);

  const yearOfBirthOptions = computed(() => {
    let array = [];
    const to = new Date().getFullYear() - 60;
    const from = new Date().getFullYear() - 18;
    for (let i = to; i <= from; i++) {
      array.push(i);
    }
    return array.reverse();
  });

  const livingConditionsOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "livingConditions" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].label = "xa";
      options.push(storeData[i]);
    }
    return options;
  });

  const numberOfPatientsOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "numberOfPatients" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push(storeData[i]);
    }
    return options;
  });

  const notificationOptions = computed(() => [
    {
      value: "sms",
      label: "SMS",
    },
    {
      value: "whats_app",
      label: "WhatsApp",
    },
    {
      value: null,
      label: t(`global.none`),
    },
  ]);

  const taxTypeOptions = computed(() => [
    {
      value: "include",
      label: t(`global.taxTypeOptions.include`),
    },
    {
      value: "exclude",
      label: t(`global.taxTypeOptions.exclude`),
    },
  ]);

  const localeOptions = computed(() => [
    {
      value: "pl",
      label: t("global.languages.pl"),
    },
    {
      value: "en",
      label: t("global.languages.en"),
    },
    {
      value: "de",
      label: t("global.languages.de"),
    },
  ]);

  const otherPeopleInHouseOptions = [
    // {
    //   value: "no",
    //   label: t(`global.otherPeopleInHouse.no`),
    // },
    // {
    //   value: "alone",
    //   label: t(`global.otherPeopleInHouse.alone`),
    // },
    // {
    //   value: "with_spouse",
    //   label: t(`global.otherPeopleInHouse.with_spouse`),
    // },
    // {
    //   value: "with_family",
    //   label: t(`global.otherPeopleInHouse.with_family`),
    // },
    0, 1, 2, 3, 4, 5,
  ];

  const genderOptions = computed(() => [
    {
      value: "male",
      label: t(`global.genders.male`),
    },
    {
      value: "female",
      label: t(`global.genders.female`),
    },
  ]);

  const vatOptions = computed(() => [
    {
      value: "excl",
      label: "excl. VAT",
    },
    {
      value: "incl",
      label: "incl. VAT",
    },
  ]);

  const nightOperationsOptions = computed(() => [
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
  ]);

  const notImportantNightOperationsOptions = computed(() => [
    {
      value: "not_important",
      label: t("global.not_important"),
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
  ]);

  const sharedAccommodationOptions = computed(() => [
    {
      value: "room_premises",
      label: t("global.caregiverAccommodationOptions.roomPremises"),
    },
    {
      value: "area_premises",
      label: t("global.caregiverAccommodationOptions.areaPremises"),
    },
    {
      value: "room_other_premises",
      label: t("global.caregiverAccommodationOptions.roomOtherPremises"),
    },
    {
      value: "area_other_premises",
      label: t("global.caregiverAccommodationOptions.areaOtherPremises"),
    },
  ]);
  const forCaregiverAccommodationOptions = computed(() => [
    ...sharedAccommodationOptions.value,
    {
      value: "other",
      label: t("global.other"),
    },
  ]);
  const caregiverAccommodationOptions = computed(() => [
    ...sharedAccommodationOptions.value,
    {
      value: "not_important",
      label: t("global.not_important"),
    },
  ]);

  const workInHolidayOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "holidays" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push({
        holiday: storeData[i],
      });
    }
    return options;
  });

  const countryOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "countries" })),
    );

    if (!storeData) {
      return null;
    }
    return storeData;
  });

  const mobilityOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "mobilities" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].mobility = t(
        `global.patientsMobilityOptions.${storeData[i].mobility
          .toLowerCase()
          .replace(/ /g, "_")}`,
      );
      options.push(storeData[i]);
    }
    return options;
  });

  const languageOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "languages" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].name = t(
        `global.languageOptions.${storeData[i].code.toLowerCase()}`,
      );
      storeData[i].codeLowercase = storeData[i].code.toLowerCase();
      options.push(storeData[i]);
    }
    return options;
  });

  const toolsOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "tools" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].tool = t(
        `global.toolsOptions.${storeData[i].tool
          .toLowerCase()
          .replace(/ /g, "_")}`,
      );
      options.push(storeData[i]);
    }
    return options;
  });

  const locationOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "locations" })),
    );
    if (!storeData) {
      return [];
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push(storeData[i]);
    }
    return options;
  });

  const customerOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "customers" })),
    );
    if (!storeData) {
      return [];
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push(storeData[i]);
    }
    return options;
  });

  const arrivalTypeOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "arrivalTypes" })),
    );
    if (!storeData) {
      return [];
    }
    let options = [];
    for (let i in storeData) {
      storeData[i].type = t(
        `global.arrivalTypeOptions.${storeData[i].type
          .toLowerCase()
          .replaceAll(" ", "_")}`,
      );
      delete storeData[i].__typename;
      options.push(storeData[i]);
    }
    return options;
  });

  const caregiverAgencyOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "caregiverAgencies" })),
    );
    if (!storeData) {
      return [];
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push(storeData[i]);
    }
    return options;
  });

  const heightOptions = [
    { value: "140-150", label: "140-150" },
    { value: "151-160", label: "151-160" },
    { value: "161-170", label: "161-170" },
    { value: "171-180", label: "171-180" },
    { value: "181-190", label: "181-180" },
    { value: "190+", label: "190+" },
  ];

  const weightOptions = [
    { value: "40-50", label: "40-50" },
    { value: "51-60", label: "51-60" },
    { value: "61-70", label: "61-70" },
    { value: "71-80", label: "71-80" },
    { value: "81-90", label: "81-90" },
    { value: "91-100", label: "91-100" },
    { value: "> 100", label: "> 100" },
  ];

  const liftOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "lifts" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].name = t(
        `global.lifts.${storeData[i].name
          .toLowerCase()
          .replaceAll(" ", "_")
          .replaceAll(",", "")}`,
      );
      options.push(storeData[i]);
    }
    return options;
  });

  const dementiaOptions = computed(() => [
    {
      value: "no",
      label: t("global.patientsDementiaOptions.no"),
    },
    {
      value: "low",
      label: t("global.patientsDementiaOptions.low"),
    },
    {
      value: "medium",
      label: t("global.patientsDementiaOptions.medium"),
    },
    {
      value: "hard",
      label: t("global.patientsDementiaOptions.hard"),
    },
  ]);

  const incontinenceOptions = computed(() => [
    {
      value: false,
      label: t("global.incontinenceOptions.false"),
    },
    {
      value: true,
      label: t("global.incontinenceOptions.true"),
    },
  ]);

  const trueFalseOptions = computed(() => [
    {
      value: false,
      label: t("global.incontinenceOptions.false"),
    },
    {
      value: true,
      label: t("global.incontinenceOptions.true"),
    },
  ]);

  const drivingLicenseOptions = computed(() => [
    {
      value: "no",
      label: t("global.drivingLicenseOptions.no"),
    },
    {
      value: "yes_automatic_manual",
      label: t("global.drivingLicenseOptions.yes_automatic_manual"),
    },
    {
      value: "yes_automatic",
      label: t("global.drivingLicenseOptions.yes_automatic"),
    },
    {
      value: "yes_manual",
      label: t("global.drivingLicenseOptions.yes_manual"),
    },
  ]);

  const notImportantDrivingLicenseOptions = computed(() => [
    {
      value: "not_important",
      label: t("global.not_important"),
    },
    {
      value: "no",
      label: t("global.drivingLicenseOptions.no"),
    },
    {
      value: "yes",
      label: t("global.drivingLicenseOptions.yes"),
    },
    {
      value: "yes_automatic_manual",
      label: t("global.drivingLicenseOptions.yes_automatic_manual"),
    },
  ]);

  const gearBoxOptions = computed(() => [
    {
      value: "manual",
      label: t("global.gearBoxOptions.manual"),
    },
    {
      value: "automatic",
      label: t("global.gearBoxOptions.automatic"),
    },
  ]);

  const languageGermanOptions = computed(() => [
    {
      value: "not_important",
      label: t("global.not_important"),
    },
    {
      value: "level_0",
      label: t("global.languageGermanOptions.level_0"),
    },
    {
      value: "level_1",
      label: t("global.languageGermanOptions.level_1"),
    },
    {
      value: "level_2",
      label: t("global.languageGermanOptions.level_2"),
    },
    {
      value: "level_3",
      label: t("global.languageGermanOptions.level_3"),
    },
    {
      value: "level_4",
      label: t("global.languageGermanOptions.level_4"),
    },
  ]);

  const yesNoOptions = computed(() => [
    {
      value: "no",
      label: t("global.no"),
    },
    {
      value: "yes",
      label: t("global.yes"),
    },
  ]);

  const yesNoNoInformationOptions = computed(() => [
    {
      value: "no",
      label: t("global.no"),
    },
    {
      value: "yes",
      label: t("global.yes"),
    },
    {
      value: "no_information",
      label: t("global.no_information"),
    },
  ]);

  const petOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "pets" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].pet = t(`global.pets.${storeData[i].pet.toLowerCase()}`);
      options.push(storeData[i]);
    }
    return options;
  });

  const equipmentOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "equipments" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].equipment = t(
        `global.equipments.${storeData[i].equipment
          .toLowerCase()
          .replaceAll(" ", "_")}`,
      );
      options.push(storeData[i]);
    }
    return options;
  });

  const salutationOptions = computed(() => [
    { value: "Mr.", label: t("global.salutations.mr") },
    { value: "Mrs.", label: t("global.salutations.mrs") },
  ]);

  const titleOptions = computed(() => [
    { value: "Dr.", label: t("global.titles.dr") },
    { value: "Mgr", label: t("global.titles.mgr") },
  ]);

  const invoicePartyOptions = computed(() => [
    { value: "patient", label: t("global.invoiceParties.patient") },
    { value: "main_contract", label: t("global.invoiceParties.mainContract") },
  ]);

  const visibilityOptions = computed(() => [
    {
      value: "public",
      label: t("global.visibilities.public"),
      icon: "public",
      class: "text-success-500",
    },
    {
      value: "public_limited",
      label: t("global.visibilities.public_limited"),
      icon: "vpn_lock",
      class: "text-warning-500",
    },
    {
      value: "hide",
      label: t("global.visibilities.hide"),
      icon: "public_off",
      class: "text-error-500",
    },
    // { value: "house", label: t("global.visibilities.house") },
    // { value: "accept", label: t("global.visibilities.accept") },
  ]);

  const urbanizationOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "urbanizations" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      storeData[i].name = t(
        `global.urbanizationOptions.${storeData[i].name
          .toLowerCase()
          .replaceAll(" ", "_")}`,
      );
      options.push(storeData[i]);
    }
    return options;
  });

  const systemLanguageOptions = computed(() => {
    const SYSTEM_LANGUAGES = ["PL", "EN", "DE"];
    return languageOptions?.value.filter(item =>
      SYSTEM_LANGUAGES.includes(item.code),
    );
  });

  const workInSummerOptions = computed(() => {
    const storeData = JSON.parse(
      JSON.stringify(storeShared.getDataByKey({ field: "summerWorkMonths" })),
    );
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push({
        summer_work_month: storeData[i],
      });
    }
    return options;
  });

  const caregiverAgencyEmployees = computed(() => {
    const storeData = JSON.parse(JSON.stringify(useSharedStore().employees));
    if (!storeData) {
      return null;
    }
    let options = [];
    for (let i in storeData) {
      delete storeData[i].__typename;
      options.push(storeData[i]);
    }
    return options;
  });

  const serviceAgencyEmployees = computed(() => {
    return null;
  });

  const getNursingExperienceOptions = () => {
    let array = [];
    for (let i = 0; i <= 30; i++) {
      if (i === 30) {
        array.push(`${i.toString()}+`);
      } else {
        array.push(i.toString());
      }
    }
    return array;
  };

  const nursingExperienceOptions = getNursingExperienceOptions();

  const notImportantYesOptions = [
    {
      value: "not_important",
      label: t("global.not_important"),
    },
    {
      value: "yes",
      label: t("global.yes"),
    },
  ];

  const notImportantNoOptions = [
    {
      value: "not_important",
      label: t("global.not_important"),
    },
    {
      value: "no",
      label: t("global.no"),
    },
  ];

  const notImportantNoYesOptions = [
    ...notImportantNoOptions,
    {
      value: "yes",
      label: t("global.yes"),
    },
  ];

  const petsPreferenceOptions = [
    {
      value: "not_important",
      label: t("global.not_important"),
    },
    {
      value: "no_dogs",
      label: t("global.petsPreferenceOptions.noDogs"),
    },
    {
      value: "no_cats",
      label: t("global.petsPreferenceOptions.noCats"),
    },
    {
      value: "no_all",
      label: t("global.petsPreferenceOptions.noAll"),
    },
  ];

  return {
    languageGermanOptions,
    drivingLicenseOptions,
    notImportantNoOptions,
    notImportantNoYesOptions,
    petsPreferenceOptions,
    locationOptions,
    heightOptions,
    weightOptions,
    mobilityOptions,
    serviceAgencyEmployees,
    notImportantDrivingLicenseOptions,
    liftOptions,
    dementiaOptions,
    incontinenceOptions,
    livingConditionsOptions,
    caregiverAgencyEmployees,
    yearOfBirthOptions,
    nightOperationsOptions,
    toolsOptions,
    genderOptions,
    yesNoOptions,
    yesNoNoInformationOptions,
    accommodationOptions,
    petOptions,
    equipmentOptions,
    salutationOptions,
    titleOptions,
    urbanizationOptions,
    trueFalseOptions,
    customerOptions,
    caregiverAgencyOptions,
    visibilityOptions,
    otherPeopleInHouseOptions,
    vatOptions,
    invoicePartyOptions,
    languageOptions,
    notImportantYesOptions,
    systemLanguageOptions,
    arrivalTypeOptions,
    taxTypeOptions,
    notificationOptions,
    localeOptions,
    workInHolidayOptions,
    workInSummerOptions,
    countryOptions,
    numberOfPatientsOptions,
    nursingExperienceOptions,
    notImportantNightOperationsOptions,
    gearBoxOptions,
    caregiverAccommodationOptions,
    forCaregiverAccommodationOptions,
  };
}
