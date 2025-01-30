export default {
  root: {
    class: [
      "relative",

      // Alignment
      "inline-flex",
      "align-bottom",

      // Size
      "w-6",
      "h-6",

      // Misc
      "cursor-pointer",
      "select-none",
    ],
  },
  box: ({ props, context }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",

      // Size
      "w-6",
      "h-6",

      // Shape
      "rounded-md",
      "border-2",

      // Colors
      {
        "border-gray-200 bg-gray-0 dark:border-gray-700 dark:bg-gray-900":
          !context.checked,
        "border-brand-500 bg-brand-500 dark:border-brand-400 dark:bg-brand-400":
          context.checked,
      },

      // States
      {
        "peer-hover:border-brand-500 dark:peer-hover:border-brand-400":
          !props.disabled && !context.checked,
        "peer-hover:bg-brand-600 dark:peer-hover:bg-brand-300 peer-hover:border-brand-700 dark:peer-hover:border-brand-300":
          !props.disabled && context.checked,
        "peer-focus-visible:border-brand-500 dark:peer-focus-visible:border-brand-400 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400/20 dark:peer-focus-visible:ring-brand-300/20":
          !props.disabled,
        "cursor-default opacity-60": props.disabled,
      },

      // Transitions
      "transition-colors",
      "duration-200",
    ],
  }),
  input: {
    class: [
      "peer",

      // Size
      "w-full ",
      "h-full",

      // Position
      "absolute",
      "top-0 left-0",
      "z-10",

      // Spacing
      "p-0",
      "m-0",

      // Shape
      "opacity-1",
      "rounded-md",
      "outline-none",
      "border-2 border-gray-200 dark:border-gray-700",

      // Misc
      "appareance-none",
      "cursor-pointer",
    ],
  },
  icon: {
    class: [
      // Font
      "leading-none",

      // Size
      "w-4",
      "h-4",

      // Colors
      "text-base-black dark:text-gray-900",

      // Transitions
      "transition-all",
      "duration-200",
    ],
  },
};
