export default {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",

      // Shape
      "w-full md:w-56",
      "rounded-md",

      // Color and Background
      "bg-gray-0 dark:bg-gray-900",
      "border border-gray-300 dark:border-gray-700",

      // Transitions
      "transition-all",
      "duration-200",

      // States
      "hover:border-brand-500 dark:hover:border-brand-300",
      {
        "outline-none outline-offset-0 ring ring-brand-400/50 dark:ring-brand-300/50":
          state.focused,
      },

      // Misc
      "cursor-pointer",
      "select-none",
      {
        "opacity-60": props.disabled,
        "pointer-events-none": props.disabled,
        "cursor-default": props.disabled,
      },
    ],
  }),
  label: ({ props }) => ({
    class: [
      //Font
      "font-sans",
      "leading-none",

      // Flex & Alignment
      " flex flex-auto",

      // Sizing and Spacing
      "w-[1%]",
      "p-3",

      //Shape
      "rounded-none",

      // Color and Background
      "bg-transparent",
      "border-0",
      {
        "text-gray-800 dark:text-white/80": props.modelValue,
        "text-gray-400 dark:text-gray-500": !props.modelValue,
      },
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",

      // Transitions
      "transition",
      "duration-200",

      // States
      "focus:outline-none focus:shadow-none",

      // Misc
      "relative",
      "cursor-pointer",
      "overflow-hidden overflow-ellipsis",
      "whitespace-nowrap",
      "appearance-none",
    ],
  }),
  dropdownbutton: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",

      // Color and Background
      "bg-transparent",
      "text-gray-500",

      // Size
      "w-12",

      // Shape
      "rounded-tr-md",
      "rounded-br-md",
    ],
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",

      // Shape
      "border-0 dark:border",
      "rounded-md",
      "shadow-md",

      // Color
      "bg-gray-0 dark:bg-gray-700",
      "text-gray-800 dark:text-white/80",
      "dark:border-gray-700",
    ],
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[200px]",

      // Misc
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

      // Shape
      "border-0",
      "rounded-none",

      // Spacing
      "m-0",

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

      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap",
    ],
  }),
  content: {
    class: [
      "relative",

      // Flexbox
      "flex",
      "items-center",

      // Spacing
      "py-3",
      "px-5",

      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none",
    ],
  },
  groupicon: {
    class: [
      // Alignment
      "ml-auto",
    ],
  },
  sublist: {
    class: [
      // Size
      "w-full",

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
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
