export default {
  root: {
    class: "overflow-x-auto",
  },
  menu: {
    class: [
      // Flexbox
      "flex flex-1",

      // Spacing
      "list-none",
      "p-0 m-0",

      // Colors
      "bg-gray-0 dark:bg-gray-800",
      "border-b-2 border-gray-200 dark:border-gray-700",
      "text-gray-900 dark:text-gray-0/80",
    ],
  },
  menuitem: {
    class: "mr-0",
  },
  action: ({ context, state }) => ({
    class: [
      "relative",

      // Font
      "font-bold",

      // Flexbox and Alignment
      "flex items-center",

      // Spacing
      "p-5",
      "-mb-[2px]",

      // Shape
      "border-b-2",
      "rounded-t-md",

      // Colors and Conditions
      {
        "border-gray-200 dark:border-gray-700":
          state.d_activeIndex !== context.index,
        "bg-gray-0 dark:bg-gray-800": state.d_activeIndex !== context.index,
        "text-gray-700 dark:text-gray-0/80":
          state.d_activeIndex !== context.index,

        "bg-gray-0 dark:bg-gray-800": state.d_activeIndex === context.index,
        "border-brand-500 dark:border-brand-400":
          state.d_activeIndex === context.index,
        "text-brand-500 dark:text-brand-400":
          state.d_activeIndex === context.index,
      },

      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset",
      "focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50",
      {
        "hover:bg-gray-0 dark:hover:bg-gray-800/80":
          state.d_activeIndex !== context.index,
        "hover:border-gray-400 dark:hover:border-brand-400":
          state.d_activeIndex !== context.index,
        "hover:text-gray-900 dark:hover:text-gray-0":
          state.d_activeIndex !== context.index,
      },

      // Transitions
      "transition-all duration-200",

      // Misc
      "cursor-pointer select-none text-decoration-none",
      "overflow-hidden",
      "user-select-none",
    ],
  }),
  icon: {
    class: "mr-2",
  },
};
