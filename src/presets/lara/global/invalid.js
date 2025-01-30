export default function (props) {
  console.log(props);
  return {
    "bg-error-500": props.variant === "error",
    "bg-warning-500": props.variant === "warning",
  };
}
