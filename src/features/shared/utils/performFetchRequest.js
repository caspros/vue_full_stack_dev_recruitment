import { getXsrfToken } from "@/src/features/shared/utils/cookies.js";
import axios from "@/src/axios.js";
import { router } from "@/src/router/index.js";

export const performRequest = async ({ uri, options, retry = true }) => {
  const xsrfToken = getXsrfToken();
  const response = await fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      ...(xsrfToken && { "X-XSRF-TOKEN": xsrfToken }),
    },
  });

  if (response.status === 401 && router.currentRoute.value.meta.auth) {
    window.location.href = "/login";
  }

  if (response.status === 419 && retry) {
    try {
      await axios.get("sanctum/csrf-cookie");

      options.headers["X-XSRF-TOKEN"] = getXsrfToken();
      return await performRequest({
        uri,
        options,
        retry: false,
      });
    } catch (e) {
      console.error("Nie udało się odświeżyć tokenu XSRF:", e);
      throw e;
    }
  }

  return response;
};
