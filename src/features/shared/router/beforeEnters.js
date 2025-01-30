import { useSharedStore } from "@/src/features/shared/store.js";
import { useCustomListStore } from "@/src/store/customList.js";
import { useCaregiverAgencyStore } from "@/src/features/caregiver-agency/store.js";
import {
  CAREGIVER_CARD_FIELDS,
  CAREGIVER_DETAILS_FIELDS,
  JOB_OFFER_PREFERENCE,
  MATCHING_DETAIL,
} from "@/src/features/shared/queries/Caregiver.js";
import {
  JOB_OFFER_APPLICATIONS_FIELDS,
  JOB_OFFER_APPLICATIONS_FIELDS_SA,
} from "@/src/features/shared/queries/JobOffer.js";
import { useAuthorizationStore } from "@/src/store/authorization.js";

export async function beforeJobDetails(to, from, next) {
  const storeAuthorization = useAuthorizationStore();
  const storeShared = useSharedStore();

  if (storeAuthorization.userType === "caregiverAgency") {
    const storeCGA = useCaregiverAgencyStore();
    storeCGA.fetchCaregiverAgency({});
  } else if (storeAuthorization.userType === "serviceAgency") {
    storeShared.fetchCaregiverAgencies({});
    if (to.params.caregiver_id) {
      storeShared.fetchCaregiverPdfOffers({
        caregiver_id: parseInt(to.params.caregiver_id),
        job_offer_id: parseInt(to.params.id),
      });
    }
  }
  const storeCustomList = useCustomListStore();

  const fields = `
    id  
    caregiver { 
      ${CAREGIVER_CARD_FIELDS}
    }`;

  to.meta.fetchJobOfferHistory = {
    query: "JobOfferHistoryWithPagination",
    fields,
    storeName: `JobOfferHistoryWithPagination|${to.params.id}`,
    limit: 10,
    queryDynamicParams: {
      variableDefinitions: "$job_offer_id: Int!",
      operationArguments: "job_offer_id: $job_offer_id",
      variables: {
        job_offer_id: parseInt(to.params.id),
      },
    },
  };

  if (
    to.meta.fetchJobOfferHistory &&
    !storeCustomList.getDataByQuery(to.meta.fetchJobOfferHistory.storeName)
  ) {
    storeCustomList.fetchCustomListData(to.meta.fetchJobOfferHistory);
  }

  to.meta.fetchJobOfferRequests = {
    query: "JobOfferRequestsWithPagination",
    fields,
    storeName: `JobOfferRequestsWithPagination|${to.params.id}`,
    limit: 99999999,
    queryDynamicParams: {
      variableDefinitions: "$job_offer_id: Int!",
      operationArguments: "job_offer_id: $job_offer_id",
      variables: {
        job_offer_id: parseInt(to.params.id),
      },
    },
  };

  if (
    to.meta.fetchJobOfferRequests &&
    !storeCustomList.getDataByQuery(to.meta.fetchJobOfferRequests.storeName)
  ) {
    storeCustomList.fetchCustomListData(to.meta.fetchJobOfferRequests);
  }

  to.meta.fetchJobOfferApplicationsWithPagination = {
    query: "JobOfferApplicationsWithPagination",
    fields:
      storeAuthorization.userType === "caregiverAgency"
        ? JOB_OFFER_APPLICATIONS_FIELDS
        : JOB_OFFER_APPLICATIONS_FIELDS_SA,
    storeName: `JobOfferApplicationsWithPagination|${to.params.id}`,
    limit: 3,
    queryDynamicParams: {
      variableDefinitions: "$job_offer_id: Int!",
      operationArguments: "job_offer_id: $job_offer_id",
      variables: {
        job_offer_id: parseInt(to.params.id),
      },
    },
  };

  if (
    to.meta.fetchJobOfferApplicationsWithPagination &&
    !storeCustomList.getDataByQuery(
      to.meta.fetchJobOfferApplicationsWithPagination.storeName,
    )
  ) {
    storeCustomList.fetchCustomListData(
      to.meta.fetchJobOfferApplicationsWithPagination,
    );
  }

  to.meta.fetchMyCaregivers = {
    query: "JobOfferMatchingsWithPagination",
    fields: `
        id 
        percentage_match 
        is_caregiver_show
        reason_caregiver
        is_show
        reason
        caregiver { 
          ${
            storeAuthorization.userType === "caregiverAgency"
              ? CAREGIVER_CARD_FIELDS
              : CAREGIVER_DETAILS_FIELDS
          }
        }
        ${MATCHING_DETAIL}
      `,
    storeName: `${to.name}|${to.params.id}`,
    limit: 10,
    filtersQuery: "JobOfferMatchingFiltersInputType",
    queryDynamicParams: {
      variableDefinitions: "$job_offer_id: Int!",
      operationArguments: "job_offer_id: $job_offer_id",
      variables: {
        job_offer_id: parseInt(to.params.id),
      },
    },
    sort: "activity",
    sortOptions: [
      {
        label: "global.sortOptions.activity",
        value: "activity",
      },
      {
        label: "global.sortOptions.bestMatching",
        value: "best_matching",
      },
      {
        label: "global.sortOptions.availability",
        value: "availability",
      },
      {
        label: "global.sortOptions.lastAvailabilityUpdate",
        value: "last_availability_update",
      },
      {
        label: "global.sortOptions.bestScore",
        value: "best_score",
      },
    ],
    pusher: {
      channel: `job_offer.${to.params.id}`,
      events: ["CalculateMatchingEvent"],
    },
  };

  if (
    to.meta.fetchMyCaregivers &&
    !storeCustomList.getDataByQuery(to.meta.fetchMyCaregivers.storeName)
  ) {
    storeCustomList.fetchCustomListData(to.meta.fetchMyCaregivers);
  }

  await storeShared.fetchJobOfferData({ id: parseInt(to.params.id) });

  next();
}
