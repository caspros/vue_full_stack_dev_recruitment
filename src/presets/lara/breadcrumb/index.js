export default {
  root: {
    class: [
      // Shape
      "rounded-md",

      // Spacing
      "p-4",

      // Color
      "bg-gray-0 dark:bg-gray-700",
      "border border-gray-200 dark:border-gray-700",

      // Misc
      "overflow-x-auto",
    ],
  },
  menu: {
    class: [
      // Flex & Alignment
      "flex items-center flex-nowrap",

      // Spacing
      "m-0 p-0 list-none leading-none",
    ],
  },
  action: {
    class: [
      // Flex & Alignment
      "flex items-center",

      // Shape
      "rounded-md",

      // Color
      "text-gray-600 dark:text-white/70",

      // States
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50",

      // Transitions
      "transition-shadow duration-200",

      // Misc
      "text-decoration-none",
    ],
  },
  icon: {
    class: "text-gray-600 dark:text-white/70",
  },
  separator: {
    class: [
      // Flex & Alignment
      "flex items-center",

      // Spacing
      " mx-2",

      // Color
      "text-gray-600 dark:text-white/70",
    ],
  },
};
