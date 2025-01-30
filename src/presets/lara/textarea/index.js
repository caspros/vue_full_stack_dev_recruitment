export default {
  root: ({ context }) => ({
    class: [
      // Font
      "font-sans leading-none",

      // Spacing
      "m-0",
      "p-3",

      // Shape
      "rounded-md",

      // Colors
      "text-gray-600 dark:text-gray-200",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "bg-gray-0 dark:bg-gray-900",
      "border border-gray-300 dark:border-gray-600",

      // States
      {
        "hover:border-brand-500 dark:hover:border-brand-400": !context.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-500/50 dark:focus:ring-brand-400/50":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },

      // Misc
      "appearance-none",
      "transition-colors duration-200",
    ],
  }),
};
