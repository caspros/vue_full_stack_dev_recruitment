export async function downloadFile(file) {
  const response = await fetch(file.aws_url);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", file.original_name);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}
