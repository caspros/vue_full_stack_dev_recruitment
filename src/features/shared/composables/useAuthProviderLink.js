const API_URL = import.meta.env.VITE_API_URL;

export function useAuthProviderLink() {
  function getHref({ provider, uuid, mode }) {
    const uuidQuery = uuid ? `uuid=${uuid}` : "";
    const loginQuery = mode === "login" ? `login=true` : "";
    const registerQuery = mode === "register" ? `register=true` : "";

    const queries = `${[uuidQuery, loginQuery, registerQuery]
      .filter(Boolean)
      .join("&")}`;

    const href = `${API_URL}/auth/${provider}${queries ? `?${queries}` : ""}`;

    return href;
  }

  return {
    getHref,
  };
}
