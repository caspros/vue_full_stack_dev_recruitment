export default {
  root: {
    class: [
      // Shape
      "rounded-lg",
      "shadow-lg",
      "border-0",

      // Positioning
      "z-40 transform origin-center",
      "mt-3 absolute left-0 top-0",

      // Color
      "dark:border",
      "dark:border-gray-700",
      "bg-gray-0 dark:bg-gray-800",
      "text-gray-700 dark:text-gray-0/80",

      // Before: Arrow
      "before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-gray-0 dark:before:border-b-gray-800",
    ],
  },
  content: {
    class: "p-5 items-center flex",
  },
  icon: {
    class: "text-2xl mr-4",
  },
  footer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-end",
      "shrink-0",
      "text-right",
      "gap-2",

      // Spacing
      "px-6",
      "pb-6",

      // Shape
      "border-t-0",
      "rounded-b-lg",

      // Colors
      "bg-gray-0 dark:bg-gray-800",
      "text-gray-700 dark:text-gray-0/80",
    ],
  },
  rejectbutton: {
    root: {
      class: [
        "relative",

        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",

        // Sizes & Spacing
        "px-4 py-3 leading-none",

        // Shape
        "rounded-md",

        // Color
        "text-brand-500 dark:text-brand-400",

        // States
        "hover:bg-brand-300/20",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
      ],
    },
  },
  acceptbutton: {
    root: {
      class: [
        "relative",

        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",

        // Sizes & Spacing
        "px-4 py-3 leading-none",

        // Shape
        "rounded-md",

        // Color
        "text-white dark:text-gray-900",
        "bg-brand-500 dark:bg-brand-400",
        "border border-brand-500 dark:border-brand-400",

        // States
        "hover:bg-brand-600 dark:hover:bg-brand-300 hover:border-brand-600 dark:hover:border-brand-300",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
      ],
    },
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
