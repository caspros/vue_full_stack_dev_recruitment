export default function (props) {
  return {
    "min-h-[44px] text-lg placeholder:text-lg": props.size === "lg",
    "min-h-[44px] text-md placeholder:text-md": props.size === "md",
    "min-h-[36px] text-sm placeholder:text-sm": props.size === "sm",
    "": props.size === null,
  };
}
