export default {
  root: {
    class: [
      "cursor-pointer inline-flex relative select-none align-bottom",
      "w-6 h-6",
    ],
  },
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
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border-2 border-gray-200 dark:border-gray-700",

      // Misc
      "appareance-none",
      "cursor-pointer",
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
          !context.active,
        "border-brand-500 bg-brand-500 dark:border-brand-400 dark:bg-brand-400":
          context.active,
      },

      // States
      {
        "peer-hover:border-brand-500 dark:peer-hover:border-brand-400":
          !props.disabled && !context.active,
        "peer-hover:bg-brand-600 dark:peer-hover:bg-brand-300 peer-hover:border-brand-700 dark:peer-hover:border-brand-300":
          !props.disabled && context.active,
        "peer-focus-visible:border-brand-500 dark:peer-focus-visible:border-brand-400 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400/20 dark:peer-focus-visible:ring-brand-300/20":
          !props.disabled,
        "cursor-default opacity-60": props.disabled,
      },

      // Transitions
      "transition-colors",
      "duration-200",
    ],
  }),
  checkicon: {
    class: [
      // Font
      "text-base leading-none",

      // Size
      "w-4",
      "h-4",

      // Colors
      "text-white dark:text-gray-900",

      // Transitions
      "transition-all",
      "duration-200",
    ],
  },
  uncheckicon: {
    class: [
      // Font
      "text-base leading-none",

      // Size
      "w-4",
      "h-4",

      // Colors
      "text-white dark:text-gray-900",

      // Transitions
      "transition-all",
      "duration-200",
    ],
  },
};
