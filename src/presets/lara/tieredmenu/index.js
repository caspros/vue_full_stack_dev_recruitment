export default {
  root: {
    class: [
      // Shape
      "rounded-md",

      // Size
      "min-w-[12rem]",
      "py-1",

      // Colors
      "bg-gray-0 dark:bg-gray-700",
      "border border-gray-200 dark:border-gray-700",
    ],
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none",
    ],
  },
  menuitem: {
    class: [
      // Position
      "relative",
    ],
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-none",

      //  Colors
      {
        "text-gray-500 dark:text-white/70": !context.focused && !context.active,
        "text-gray-500 dark:text-white/70 bg-gray-200 dark:bg-gray-600/90":
          context.focused && !context.active,
        "text-brand-700 dark:text-gray-0/80 bg-brand-50 dark:bg-brand-400/30":
          context.focused && context.active,
        "text-brand-700 dark:text-gray-0/80 bg-brand-50 dark:bg-brand-400/30":
          !context.focused && context.active,
      },

      // Hover States
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80": !context.active,
        "hover:bg-brand-500/50 dark:hover:bg-brand-300/30 text-brand-700 dark:text-gray-0/80":
          context.active,
      },

      // Transitions
      "transition-shadow",
      "duration-200",
    ],
  }),
  action: {
    class: [
      "relative",
      // Flexbox

      "flex",
      "items-center",

      // Spacing
      "py-3",
      "px-5",

      // Color
      "text-gray-700 dark:text-white/80",

      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none",
    ],
  },
  icon: {
    class: [
      // Spacing
      "mr-2",

      // Color
      "text-gray-600 dark:text-white/70",
    ],
  },
  label: {
    class: ["leading-none"],
  },
  submenuicon: {
    class: [
      // Position
      "ml-auto",
    ],
  },
  submenu: {
    class: [
      // Size
      "w-full sm:w-48",

      // Spacing
      "py-1",
      "m-0",
      "list-none",

      // Shape
      "shadow-none sm:shadow-md",
      "border-0",

      // Position
      "static sm:absolute",
      "z-10",

      // Color
      "bg-gray-0 dark:bg-gray-700",
    ],
  },
  separator: {
    class: "border-t border-gray-200 dark:border-gray-600 my-1",
  },
};
