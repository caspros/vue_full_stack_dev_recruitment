export function getXsrfToken() {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  return token ? decodeURIComponent(token) : null;
}
