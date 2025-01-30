export default {
  root: {
    class: [
      // Space
      "p-5",

      // Shape
      "rounded-md",

      // Color
      "bg-gray-0 dark:bg-gray-800",
      "text-gray-700 dark:text-white/80",
      "border border-solid border-gray-200 dark:border-gray-700",
    ],
  },
  wrapper: {
    class: ["overflow-auto"],
  },
  container: {
    class: [
      // Spacing
      "m-0 p-0",

      // Misc
      "list-none overflow-auto",
    ],
  },
  node: {
    class: [
      "p-1",
      "rounded-md",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
    ],
  },
  content: ({ context, props }) => ({
    class: [
      // Flex and Alignment
      "flex items-center",

      // Shape
      "rounded-md",

      // Spacing
      "p-2",

      // Colors
      "text-gray-600 dark:text-white/70",
      {
        "bg-brand-50 dark:bg-brand-400/30 text-brand-600 dark:text-gray-0":
          context.selected,
      },

      // States
      {
        "hover:bg-gray-50 dark:hover:bg-gray-700/40":
          (props.selectionMode == "single" ||
            props.selectionMode == "multiple") &&
          !context.selected,
      },

      // Transition
      "transition-shadow duration-200",

      {
        "cursor-pointer select-none":
          props.selectionMode == "single" || props.selectionMode == "multiple",
      },
    ],
  }),
  toggler: ({ context }) => ({
    class: [
      // Flex and Alignment
      "inline-flex items-center justify-center",

      // Shape
      "border-0 rounded-full",

      // Size
      "w-8 h-8",

      // Spacing
      "mr-2",

      // Colors
      "bg-transparent",
      {
        "text-gray-500 dark:text-white": !context.selected,
        "text-brand-600 dark:text-white": context.selected,
        invisible: context.leaf,
      },

      // States
      "hover:bg-gray-200/20 dark:hover:bg-gray-500/20",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 dark:focus:ring-brand-300/50",

      // Transition
      "transition duration-200",

      // Misc
      "cursor-pointer select-none",
    ],
  }),
  nodeCheckbox: {
    root: {
      class: [
        "relative",

        // Alignment
        "inline-flex",
        "align-bottom",

        // Size
        "w-6",
        "h-6",

        // Spacing
        "mr-2",

        // Misc
        "cursor-pointer",
        "select-none",
      ],
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",

        // Size
        "w-6",
        "h-6",

        // Shape
        "rounded-md",
        "border-2",

        // Colors
        {
          "border-gray-200 bg-gray-0 dark:border-gray-700 dark:bg-gray-900":
            !context.checked,
          "border-brand-500 bg-brand-500 dark:border-brand-400 dark:bg-brand-400":
            context.checked,
        },

        // States
        {
          "peer-hover:border-brand-500 dark:peer-hover:border-brand-400":
            !props.disabled && !context.checked,
          "peer-hover:bg-brand-600 dark:peer-hover:bg-brand-300 peer-hover:border-brand-700 dark:peer-hover:border-brand-300":
            !props.disabled && context.checked,
          "peer-focus-visible:border-brand-500 dark:peer-focus-visible:border-brand-400 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400/20 dark:peer-focus-visible:ring-brand-300/20":
            !props.disabled,
          "cursor-default opacity-60": props.disabled,
        },

        // Transitions
        "transition-colors",
        "duration-200",
      ],
    }),
    input: {
      class: [
        "peer",

        // Size
        "w-full ",
        "h-full",

        // Position
        "absolute",
        "top-0 left-0",
        "z-10",

        // Spacing
        "p-0",
        "m-0",

        // Shape
        "opacity-0",
        "rounded-md",
        "outline-none",
        "border-2 border-gray-200 dark:border-gray-700",

        // Misc
        "appareance-none",
        "cursor-pointer",
      ],
    },
    icon: {
      class: [
        // Font
        "text-base leading-none",

        // Size
        "w-4",
        "h-4",

        // Colors
        "text-white dark:text-gray-900",

        // Transitions
        "transition-all",
        "duration-200",
      ],
    },
  },
  nodeicon: {
    class: [
      // Space
      "mr-2",

      // Color
      "text-gray-600 dark:text-white/70",
    ],
  },
  subgroup: {
    class: ["m-0 list-none p-0 pl-2 mt-1"],
  },
  filtercontainer: {
    class: [
      "relative block",

      // Space
      "mb-2",

      // Size
      "w-full",
    ],
  },
  input: {
    class: [
      "relative",
      // Font
      "font-sans leading-none",

      // Spacing
      "m-0",
      "p-3 pr-10",

      // Size
      "w-full",

      // Shape
      "rounded-md",

      // Colors
      "text-gray-600 dark:text-gray-200",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "bg-gray-0 dark:bg-gray-900",
      "border border-gray-300 dark:border-gray-600",

      // States
      "hover:border-brand-500 dark:hover:border-brand-400",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-500/50 dark:focus:ring-brand-400/50",

      // Transition & Misc
      "appearance-none",
      "transition-colors duration-200",
    ],
  },
  loadingicon: {
    class: [
      "text-gray-500 dark:text-gray-0/70",
      "absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin",
    ],
  },
  searchicon: {
    class: [
      // Position
      "absolute top-1/2 -mt-2 right-3",

      // Color
      "text-gray-600 dark:hover:text-white/70",
    ],
  },
};
