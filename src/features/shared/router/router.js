import { beforeJobDetails } from "@/src/features/shared/router/beforeEnters.js";
import { useSharedStore } from "@/src/features/shared/store.js";

export const JOB_DETAILS_ROUTE = {
  path: ":id",
  component: () => import("../../shared/components/JobDetails.vue"),
  name: "JobDetails",
  beforeEnter: beforeJobDetails,
  meta: {
    breadcrumb: function () {
      const store = useSharedStore();
      if (store.jobOffer) {
        return `Job ID: ${store.jobOffer.job_offer_id}`;
      }
      return "";
    },
    auth: true,
  },
};
