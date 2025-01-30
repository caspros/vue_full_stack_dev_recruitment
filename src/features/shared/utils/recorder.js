// import * as Sentry from "@sentry/vue";
// import { productFruits } from "product-fruits";

const ALLOWED_URLS = [import.meta.env.VITE_API_URL];
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const DSN = import.meta.env.VITE_SENTRY_DNS;

export function startRecord({ router, app }) {
  if (ENVIRONMENT !== "production" || !import.meta.env.PROD) return;
  // Sentry.init({
  //   app,
  //   dsn: DSN,
  //   integrations: [
  //     Sentry.browserTracingIntegration({ router }),
  //     Sentry.replayIntegration({
  //       networkDetailAllowUrls: ALLOWED_URLS,
  //       maskAllText: false,
  //     }),
  //   ],
  //   tracesSampleRate: 1.0,
  //   replaysSessionSampleRate: 0.1,
  //   replaysOnErrorSampleRate: 1.0,
  // });
}

export function setRecordUser({ id, name, email, current_roleable }) {
  if (ENVIRONMENT === "production" || !import.meta.env.PROD) return;

  // Sentry.setUser({
  //   name,
  //   email,
  // });

  // if (current_roleable?.roleable_type === "caregiver") {
  //   productFruits.init("0q3RRyySrLmbqf15", "en", {
  //     username: `name (id: ${id})`,
  //   });
  // }
}
