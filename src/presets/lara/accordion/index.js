export default {
  accordiontab: {
    root: {
      class: "mb-1",
    },
    header: ({ props }) => ({
      class: [
        // State
        {
          "select-none pointer-events-none cursor-default opacity-60":
            props?.disabled,
        },
      ],
    }),
    headerAction: ({ context }) => ({
      class: [
        //Font
        "font-bold",
        "leading-none",

        // Alignments
        "flex items-center",
        "relative",

        // Sizing
        "p-5",

        // Shape
        "rounded-t-md",
        {
          "rounded-br-md rounded-bl-md": !context.active,
          "rounded-br-0 rounded-bl-0": context.active,
        },

        // Color
        "border border-gray-200 dark:border-gray-700",
        "bg-gray-50 dark:bg-gray-800",
        "text-gray-600 dark:text-gray-0/80",
        { "text-gray-900": context.active },

        // Transition
        "transition duration-200 ease-in-out",
        "transition-shadow duration-200",

        // States
        "hover:bg-gray-100 dark:hover:bg-gray-700/40",
        "hover:text-gray-900",
        "focus:outline-none focus:outline-offset-0 focus-visible:ring focus-visible:ring-brand-400/50 ring-inset dark:focus-visible:ring-brand-300/50", // Focus

        // Misc
        "cursor-pointer no-underline select-none",
      ],
    }),
    headerIcon: {
      class: "inline-block mr-2",
    },
    headerTitle: {
      class: "leading-none",
    },
    content: {
      class: [
        // Spacing
        "p-5",

        //Shape
        "rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg",
        "border-t-0",

        // Color
        "bg-gray-0 dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "text-gray-700 dark:text-gray-0/80",
      ],
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
  },
};
