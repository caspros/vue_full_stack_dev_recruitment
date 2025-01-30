export async function getFileSize({ url, formatted = false }) {
  try {
    const response = await fetch(url);
    const contentLength = response.headers.get("Content-Length");
    if (contentLength) {
      if (formatted) {
        return formatFileSize(parseInt(contentLength, 10));
      } else {
        return parseInt(contentLength, 10);
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

function formatFileSize(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${Math.floor(bytes)} ${units[index]}`;
}
