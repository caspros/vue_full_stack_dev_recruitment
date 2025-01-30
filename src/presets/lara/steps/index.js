export default {
  root: {
    class: "relative",
  },
  menu: {
    class: "p-0 m-0 list-none flex",
  },
  menuitem: {
    class: [
      // Flexbox and Position
      "relative",
      "flex",
      "justify-center",
      "flex-1",
      "overflow-hidden",

      // Before
      "before:border-t",
      "before:border-gray-200",
      "before:dark:border-gray-700",
      "before:w-full",
      "before:absolute",
      "before:top-1/2",
      "before:left-0",
      "before:transform",
      "before:-mt-4",
    ],
  },
  action: ({ props }) => ({
    class: [
      // Flexbox
      "inline-flex items-center",
      "flex-col",

      // Transitions and Shape
      "transition-shadow",
      "rounded-md",

      // Colors
      "bg-gray-0",
      "dark:bg-transparent",

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring",
      "focus:ring-brand-400/50 dark:focus:ring-brand-300/50",

      // Misc
      "overflow-hidden",
      { "cursor-pointer": !props.readonly },
    ],
  }),
  step: ({ context, props }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",

      // Position
      "z-20",

      // Shape
      "rounded-full",
      "border",

      // Size
      "w-[2rem]",
      "h-[2rem]",
      "text-sm",
      "leading-[2rem]",

      // Colors
      {
        "text-gray-400 dark:text-white/60": !context.active,
        "border-gray-100 dark:border-gray-700": !context.active,
        "bg-gray-0 dark:bg-gray-800": !context.active,
        "bg-brand-500 dark:bg-brand-400": context.active,
        "border-brand-500 dark:border-brand-400": context.active,
        "text-gray-0 dark:text-gray-900": context.active,
      },

      // States
      {
        "hover:border-gray-300 dark:hover:border-gray-500":
          !context.active && !props.readonly,
      },

      // Transition
      "transition-colors duration-200 ease-in-out",
    ],
  }),
  label: ({ context }) => ({
    class: [
      // Font
      "leading-5",
      { "font-bold": context.active },

      // Display
      "block",

      // Spacing
      "mt-2",

      // Colors
      {
        "text-gray-400 dark:text-white/60": !context.active,
        "text-gray-800 dark:text-white/80": context.active,
      },

      // Text and Overflow
      "whitespace-nowrap",
      "overflow-hidden",
      "overflow-ellipsis",
      "max-w-full",
    ],
  }),
};
