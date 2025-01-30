import size from "@/src/presets/lara/global/size.js";
import invalid from "@/src/presets/lara/global/invalid.js";

export default {
  root: ({ props, context, parent }) => ({
    class: [
      // Font
      "font-inter leading-none",
      "w-full",
      // Spacing
      "m-0 px-7",
      size(props),

      // Shape
      { "rounded-lg": parent.instance.$name !== "InputGroup" },
      {
        "first:rounded-l-md rounded-none last:rounded-r-md":
          parent.instance.$name == "InputGroup",
      },
      {
        "border-0 border-y border-l last:border-r":
          parent.instance.$name == "InputGroup",
      },
      {
        "first:ml-0 ml-[-1px]":
          parent.instance.$name == "InputGroup" && !props.showButtons,
      },

      // Colors
      "text-gray-700",
      "placeholder:text-gray-500",
      "bg-gray-0 dark:bg-gray-900",
      "border",

      // States
      {
        "border-gray-300": !props.variant,
        "hover:border-brand-500 dark:hover:border-brand-400": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-gray-300/[.3]":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
        "focus:ring-error-300/[.2] bg-error-50 border-error-400":
          props.variant === "error",
        "focus:ring-warning-300/[.2] bg-warning-500/[.1] border-warning-400":
          props.variant === "warning",
      },

      // Misc
      "appearance-none",
      "transition-colors duration-200",
    ],
  }),
};
