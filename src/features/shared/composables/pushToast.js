export default function pushToast({
  toast,
  error = null,
  success = null,
  warning = null,
  info = null,
  customError = null,
  life = 3000,
  events = null,
  severity,
}) {
  if (error) {
    if (error[0].extensions.category === "validation") {
      error = {
        title: error[0].extensions.category,
        content: getMessage(error[0].extensions.validation),
      };
    }
  }
  if (customError) {
    switch (severity) {
      case "error":
        error = customError;
        break;
      case "success":
        success = customError;
        break;
      case "warning":
        warning = customError;
        break;
      case "info":
        info = customError;
        break;
      default:
        error = customError;
        break;
    }
  }

  toast.add({
    error,
    success,
    warning,
    info,
    life,
    events,
    severity: "info",
  });
}

function getMessage(messages) {
  let errorString = "";
  for (let key in messages) {
    if (messages.hasOwnProperty(key)) {
      errorString += messages[key].join("<br>") + "<br>";
    }
  }
  return errorString;
}
