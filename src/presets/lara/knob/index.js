export default {
  root: ({ props }) => ({
    class: [
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  range: {
    class: [
      // Stroke
      "stroke-current",

      // Color
      "stroke-gray-200 dark:stroke-gray-700",

      // Fill
      "fill-none",

      // Transition
      "transition duration-100 ease-in",
    ],
  },
  value: {
    class: [
      // Animation
      "animate-dash-frame",

      // Color
      "stroke-brand-500 dark:stroke-brand-400",

      // Fill
      "fill-none",
    ],
  },
  label: {
    class: [
      // Text Style
      "text-center text-xl",

      // Color
      "fill-gray-600 dark:fill-gray-200",
    ],
  },
};
