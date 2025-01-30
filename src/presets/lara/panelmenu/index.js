export default {
  panel: {
    class: "mb-1",
  },
  header: {
    class: [
      "rounded-md",
      "outline-none",
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50",
    ],
  },
  headercontent: ({ context, instance }) => ({
    class: [
      // Shape
      "rounded-t-md",
      {
        "rounded-br-md rounded-bl-md":
          !context.active || instance.activeItem?.items === undefined,
        "rounded-br-0 rounded-bl-0":
          context.active && instance.activeItem?.items !== undefined,
      },

      // Color
      "border border-gray-200 dark:border-gray-700",
      "bg-gray-50 dark:bg-gray-800",
      "text-gray-600 dark:text-gray-0/80",
      { "text-gray-900": context.active },

      // States
      "hover:bg-gray-100 dark:hover:bg-gray-700/80",
      "hover:text-gray-900",

      // Transition
      "transition duration-200 ease-in-out",
      "transition-shadow duration-200",
    ],
  }),
  headeraction: {
    class: [
      "relative",

      // Font
      "font-bold",
      "leading-none",

      // Flex & Alignments
      "flex items-center",

      // Spacing
      "p-5",

      // Misc
      "select-none cursor-pointer no-underline",
    ],
  },
  headerlabel: {
    class: "leading-none",
  },
  headerIcon: {
    class: "mr-2",
  },
  submenuicon: {
    class: "mr-2",
  },
  menucontent: {
    class: [
      // Spacing
      "py-2",

      // Shape
      "border border-t-0",
      "rounded-t-none rounded-br-md rounded-bl-md",

      // Color
      "text-gray-700 dark:text-white/80",
      "bg-gray-0 dark:bg-gray-800",
      "border-gray-200 dark:border-gray-700",
    ],
  },
  menu: {
    class: ["outline-none", "m-0 p-0 list-none"],
  },
  content: {
    class: [
      // Shape
      "border-none rounded-none",

      // Color
      "text-gray-700 dark:text-white/80",

      // Transition
      "transition-shadow duration-200",
    ],
  },
  action: ({ context }) => ({
    class: [
      "relative",

      // Font
      "leading-none",

      // Flex & Alignments
      "flex items-center",

      // Spacing
      "py-3 px-5",

      // Color
      "text-gray-700 dark:text-white/80",

      // States
      "hover:bg-gray-100 dark:hover:bg-gray-700/80 hover:text-gray-700 dark:hover:text-white/80",
      {
        "bg-gray-200 text-gray-700 dark:text-white/80 dark:bg-gray-600/90":
          context.focused,
      },

      // Misc
      "cursor-pointer no-underline",
      "select-none overflow-hidden",
    ],
  }),
  icon: {
    class: "mr-2",
  },
  submenu: {
    class: "p-0 pl-4 m-0 list-none",
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass:
      "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass:
      "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0",
  },
};
