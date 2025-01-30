export default {
  root: ({ props }) => ({
    class: [
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  button: ({ context }) => ({
    class: [
      "relative",
      // Font
      "leading-none",

      // Flex Alignment
      "inline-flex items-center align-bottom text-center",

      // Spacing
      "px-4 py-3",

      // Shape
      "border border-r-0",
      "first:rounded-l-md first:rounded-tr-none first:rounded-br-none",
      "last:border-r last:rounded-tl-none last:rounded-bl-none last:rounded-r-md",

      // Color
      {
        "bg-gray-0 dark:bg-gray-900": !context.active,
        "text-gray-700 dark:text-white/80": !context.active,
        "border-gray-200 dark:border-gray-700": !context.active,
        "bg-brand-500 dark:bg-brand-400 border-brand-500 dark:border-brand-400 text-white dark:text-gray-900":
          context.active,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 dark:focus:ring-brand-300/50 focus:z-10",
      {
        "hover:bg-gray-50 dark:hover:bg-gray-800/80": !context.active,
        "hover:bg-brand-600 dark:hover:bg-brand-300": context.active,
      },
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },
      // Transition
      "transition duration-200",

      // Misc
      "cursor-pointer select-none overflow-hidden",
    ],
  }),
  label: {
    class: "font-bold",
  },
};
