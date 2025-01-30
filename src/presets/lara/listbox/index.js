export default {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",

      // Colors
      "bg-gray-0 dark:bg-gray-800",
      "text-gray-700 dark:text-white/80",
      "border border-gray-200 dark:border-gray-600",
    ],
  },
  wrapper: {
    class: [
      // Overflow
      "overflow-auto",
    ],
  },
  list: {
    class: "py-3 list-none m-0",
  },
  item: ({ context }) => ({
    class: [
      // Font
      "font-normal",
      "leading-none",

      // Position
      "relative",

      // Shape
      "border-0",
      "rounded-none",

      // Spacing
      "m-0",
      "py-3 px-5",

      // Color
      {
        "text-gray-700 dark:text-white/80":
          !context.focused && !context.selected,
      },
      {
        "bg-gray-200 dark:bg-gray-600/60 text-gray-700 dark:text-white/80":
          context.focused && !context.selected,
      },
      {
        "bg-brand-100 dark:bg-brand-400/40 text-brand-700 dark:text-white/80":
          context.focused && context.selected,
      },
      {
        "bg-brand-50 dark:bg-brand-400/40 text-brand-700 dark:text-white/80":
          !context.focused && context.selected,
      },

      //States
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80":
          !context.focused && !context.selected,
      },
      {
        "hover:text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600/80":
          context.focused && !context.selected,
      },
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50",

      // Transitions
      "transition-shadow",
      "duration-200",

      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap",
    ],
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",

      // Spacing
      "m-0",
      "py-3 px-5",

      // Color
      "text-gray-800 dark:text-white/80",
      "bg-gray-0 dark:bg-gray-600/80",

      // Misc
      "cursor-auto",
    ],
  },
  header: {
    class: [
      // Spacing
      "py-3 px-5",
      "m-0",

      //Shape
      "border-b",
      "rounded-tl-md",
      "rounded-tr-md",

      // Color
      "text-gray-700 dark:text-white/80",
      "bg-gray-100 dark:bg-gray-800",
      "border-gray-300 dark:border-gray-600",
    ],
  },
  filtercontainer: {
    class: "relative",
  },
  filterinput: {
    class: [
      // Font
      "font-sans",
      "leading-none",

      // Sizing
      "pr-7 py-3 px-3",
      "-mr-7",
      "w-full",

      //Color
      "text-gray-700 dark:text-white/80",
      "bg-gray-0 dark:bg-gray-900",
      "border-gray-200 dark:border-gray-700",

      // Shape
      "border",
      "rounded-lg",
      "appearance-none",

      // Transitions
      "transition",
      "duration-200",

      // States
      "hover:border-brand-500 dark:hover:border-brand-300",
      "focus:ring focus:outline-none focus:outline-offset-0",
      "focus:ring-brand-400/50 dark:focus:ring-brand-300/50",

      // Misc
      "appearance-none",
    ],
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"],
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",

      // Spacing
      "py-3 px-5",

      // Color
      "text-gray-800 dark:text-white/80",
      "bg-transparent",
    ],
  },
};
