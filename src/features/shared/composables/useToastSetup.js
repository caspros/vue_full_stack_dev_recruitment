import { useToast } from "primevue/usetoast";

export function useToastSetup() {
  const toast = useToast();
  const pushToast = ({
    error = null,
    success = null,
    warning = null,
    customError = null,
    sticky = false,
  }) => {
    if (error) {
      console.log(error);
      // if (error[0].extensions.category === "validation") {
      //   error = {
      //     title: error[0].extensions.category,
      //     content: getMessage(error[0].extensions.validation),
      //   };
      // } else if (error[0].extensions.category === "authorization") {
      //   error = {
      //     title: error[0].extensions.category,
      //     content: error[0].message,
      //   };
      // }
      error = error.map(err => {
        if (err.extensions.category === "validation") {
          return {
            title: err.extensions.category,
            content: getMessage(err.extensions.validation),
          };
        } else if (err.extensions.category === "authorization") {
          return {
            title: err.extensions.category,
            content: err.message,
          };
        } else {
          return {
            title: "Unknown error",
            content: err.message,
          };
        }
      });
      error = error[0];
    }
    if (customError) {
      error = customError;
    }

    const toastConfig = {
      error,
      success,
      warning,
      closeable: true,
    };

    if (!sticky) {
      toastConfig.life = 3000;
    }

    toast.add(toastConfig);
  };

  return { pushToast };
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
