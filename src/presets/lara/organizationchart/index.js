export default {
  table: {
    class: [
      // Spacing & Position
      "mx-auto my-0",

      // Table Style
      "border-spacing-0 border-separate",
    ],
  },
  cell: {
    class: [
      // Alignment
      "text-center align-top",

      // Spacing
      "py-0 px-3",
    ],
  },
  node: ({ props, context }) => ({
    class: [
      "relative inline-block",

      // Spacing
      "p-5",

      // Shape
      "border",

      // Color
      {
        "text-gray-600 dark:text-white/80": !context?.selected,
        "bg-gray-0 dark:bg-gray-800": !context?.selected,
        "border-gray-200 dark:border-gray-700": !context?.selected,
        "text-brand-700 dark:text-gray-0": context?.selected,
        "bg-brand-50 dark:bg-brand-400/30": context?.selected,
        "border-brand-200 dark:border-brand-600": context?.selected,
      },

      // States
      {
        "hover:bg-gray-100 dark:hover:bg-gray-700":
          context?.selectable && !context?.selected,
        "hover:bg-brand-100 dark:hover:bg-brand-300/30":
          context?.selectable && context?.selected,
      },

      { "cursor-pointer": context?.selectable },
    ],
  }),
  linecell: {
    class: [
      // Alignment
      "text-center align-top",

      // Spacing
      "py-0 px-3",
    ],
  },
  linedown: {
    class: [
      // Spacing
      "mx-auto my-0",

      // Size
      "w-px h-[20px]",

      // Color
      "bg-gray-200 dark:bg-gray-700",
    ],
  },
  lineleft: ({ context }) => ({
    class: [
      // Alignment
      "text-center align-top",

      // Spacing
      "py-0 px-3",

      // Shape
      "rounded-none border-r",
      { "border-t": context.lineTop },

      // Color
      "border-gray-200 dark:border-gray-700",
    ],
  }),
  lineright: ({ context }) => ({
    class: [
      // Alignment
      "text-center align-top",

      // Spacing
      "py-0 px-3",

      // Shape
      "rounded-none",

      // Color
      {
        "border-t border-gray-200 dark:border-gray-700": context.lineTop,
      },
    ],
  }),
  nodecell: {
    class: "text-center align-top py-0 px-3",
  },
  nodetoggler: {
    class: [
      // Position
      "absolute bottom-[-0.75rem] left-2/4 -ml-3",
      "z-20",

      // Flexbox
      "flex items-center justify-center",

      // Size
      "w-6 h-6",

      // Shape
      "rounded-full",

      // Color
      "bg-inherit text-inherit",

      // Focus
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 dark:focus:ring-brand-300/50",

      // Misc
      "cursor-pointer no-underline select-none",
    ],
  },
  nodetogglericon: {
    class: [
      // Position
      "relative inline-block",

      // Size
      "w-4 h-4",
    ],
  },
};
