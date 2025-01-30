export default {
  root: {
    class: [
      "relative",

      // Alignment
      "inline-flex",
      "align-bottom",

      // Misc
      "cursor-pointer",
      "select-none",
    ],
  },
  box: ({ props }) => ({
    class: [
      // Alignments
      "items-center inline-flex flex-1 text-center align-bottom justify-center",

      // Sizes & Spacing
      "px-4 py-3 leading-none",

      // Shapes
      "rounded-md border",

      // Colors
      {
        "bg-gray-0 dark:bg-gray-900 ": !props.modelValue,
        "border-gray-200 dark:border-gray-700 ": !props.modelValue,
        "text-gray-700 dark:text-white/80": !props.modelValue,
        "bg-brand-500 dark:bg-brand-400 border-brand-500 dark:border-brand-400 text-white dark:text-gray-900":
          props.modelValue,
      },

      // States
      {
        "peer-hover:bg-gray-50 dark:peer-hover:bg-gray-800/80 peer-hover:border-gray-200 dark:peer-hover:bg-gray-700 peer-hover:text-gray-700 dark:peer-hover:text-white/80":
          !props.modelValue,
        "peer-hover:bg-brand-600 peer-hover:border-brand-600 dark:peer-hover:bg-brand-300 dark:peer-hover:border-brand-300":
          props.modelValue,
        "peer-focus-visible:ring peer-focus-visible:ring-brand-400/50 dark:peer-focus-visible:ring-brand-300/50":
          !props.disabled,
      },

      // Transitions
      "transition-all duration-200",

      // Misc
      {
        "cursor-pointer": !props.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  label: {
    class: "font-bold text-center w-full",
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
      "border border-gray-200 dark:border-gray-700",

      // Misc
      "appareance-none",
      "cursor-pointer",
    ],
  },
  icon: ({ props }) => ({
    class: [
      " mr-2",
      {
        "text-gray-600 dark:text-white/70": !props.modelValue,
        "text-white dark:text-gray-900": props.modelValue,
      },
    ],
  }),
};
