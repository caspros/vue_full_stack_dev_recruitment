export default {
  root: {
    class: [
      "block",

      // Spacing
      "px-4 pt-2 py-3",
      "inline-size-min",

      // Shape
      "rounded-md",
      // Color
      "border border-gray-200 dark:border-gray-700",
      "bg-gray-0 dark:bg-gray-900",
      "text-gray-700 dark:text-gray-0/80",
    ],
  },
  legend: ({ props }) => ({
    class: [
      // Font
      "font-bold",
      "leading-none",

      //Spacing
      { "p-0": props.toggleable, "p-5": !props.toggleable },

      // Shape
      "rounded-md",

      // Color
      "text-gray-700 dark:text-gray-0/80",
      "border border-gray-200 dark:border-gray-700",
      "bg-gray-50 dark:bg-gray-900",

      // Transition
      "transition-none",

      // States
      {
        "hover:bg-gray-100 hover:border-gray-200 hover:text-gray-900 dark:hover:text-gray-0/80 dark:hover:bg-gray-800/80":
          props.toggleable,
      },
    ],
  }),
  toggler: ({ props }) => ({
    class: [
      // Alignments
      "flex items-center justify-center",
      "relative",

      //Spacing
      { "p-5": props.toggleable },

      // Shape
      { "rounded-md": props.toggleable },

      // Color
      {
        "text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:text-gray-900":
          props.toggleable,
      },

      // States
      {
        "hover:text-gray-900 dark:hover:text-gray-100": props.toggleable,
      },
      {
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50":
          props.toggleable,
      },

      // Misc
      {
        "transition-none cursor-pointer overflow-hidden select-none":
          props.toggleable,
      },
    ],
  }),
  togglerIcon: {
    class: "mr-2 inline-block",
  },
  legendTitle: {
    class: "flex items-center justify-center leading-none",
  },
  content: {
    class: "p-5",
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
