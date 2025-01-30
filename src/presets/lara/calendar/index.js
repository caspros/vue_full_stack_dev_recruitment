export default {
  root: ({ props }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "max-w-full",
      "relative",

      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  input: ({ props }) => ({
    class: [
      // Display
      "flex flex-auto",

      // Font
      "font-sans leading-none",

      // Colors
      "text-gray-600 dark:text-gray-200",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "bg-gray-0 dark:bg-gray-900",
      "border border-gray-300 dark:border-gray-600",

      // Spacing
      "m-0 p-3",

      // Shape
      "appearance-none",
      { "rounded-md": !props.showIcon || props.iconDisplay == "input" },
      {
        "rounded-l-md  flex-1 pr-9":
          props.showIcon && props.iconDisplay !== "input",
      },
      {
        "rounded-md flex-1 pr-9":
          props.showIcon && props.iconDisplay === "input",
      },

      // Transitions
      "transition-colors",
      "duration-200",

      // States
      "hover:border-brand-500 dark:hover:border-brand-400",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-500/50 dark:focus:ring-brand-400/50",
    ],
  }),
  inputicon: {
    class: [
      "absolute top-[50%] -mt-2",
      "text-gray-600 dark:text-gray-200",
      "right-[.75rem]",
    ],
  },
  dropdownbutton: {
    root: {
      class: [
        "relative",

        // Alignments
        "items-center inline-flex text-center align-bottom",

        // Shape
        "rounded-r-md",

        // Size
        "px-4 py-3 leading-none",

        // Colors
        "text-white dark:text-gray-900",
        "bg-brand-500 dark:bg-brand-400",
        "border border-brand-500 dark:border-brand-400",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-brand-600 dark:hover:bg-brand-300 hover:border-brand-600 dark:hover:border-brand-300",
        "focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
      ],
    },
  },
  panel: ({ props }) => ({
    class: [
      // Display & Position
      {
        absolute: !props.inline,
        "inline-block": props.inline,
      },

      // Size
      { "w-auto p-2 ": !props.inline },
      { "min-w-[80vw] w-auto p-2 ": props.touchUI },
      { "p-2 min-w-full": props.inline },

      // Shape
      "border rounded-lg",
      {
        "shadow-md": !props.inline,
      },

      // Colors
      "bg-gray-0 dark:bg-gray-800",
      "border-gray-200 dark:border-gray-700",

      //misc
      { "overflow-x-auto": props.inline },
    ],
  }),
  datepickerMask: {
    class: [
      "fixed top-0 left-0 w-full h-full",
      "flex items-center justify-center",
      "bg-black bg-opacity-90",
    ],
  },
  header: {
    class: [
      //Font
      "font-semibold",

      // Flexbox and Alignment
      "flex items-center justify-between",

      // Spacing
      "p-2",
      "m-0",

      // Shape
      "border-b",
      "rounded-t-md",

      // Colors
      "text-gray-700 dark:text-white/80",
      "bg-gray-0 dark:bg-gray-800",
      "border-gray-200 dark:border-gray-700",
    ],
  },
  previousbutton: {
    class: [
      "relative",

      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-8 h-8",
      "p-0 m-0",

      // Shape
      "rounded-full",

      // Colors
      "text-gray-600 dark:text-white/70",
      "border-0",
      "bg-transparent",

      // Transitions
      "transition-colors duration-200 ease-in-out",

      // States
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",

      // Misc
      "cursor-pointer overflow-hidden",
    ],
  },
  title: {
    class: [
      // Text
      "leading-8",
      "mx-auto my-0",
    ],
  },
  monthTitle: {
    class: [
      // Font
      "text-base leading-5",
      "font-semibold",

      // Colors
      "text-gray-700 dark:text-white/80",

      // Transitions
      "transition duration-200",

      // Spacing
      "p-2",
      "m-0 mr-2",

      // States
      "hover:text-brand-500 dark:hover:text-brand-400",

      // Misc
      "cursor-pointer",
    ],
  },
  yearTitle: {
    class: [
      // Font
      "text-base leading-5",
      "font-semibold",

      // Colors
      "text-gray-700 dark:text-white/80",

      // Transitions
      "transition duration-200",

      // Spacing
      "p-2",
      "m-0",

      // States
      "hover:text-brand-500 dark:hover:text-brand-400",

      // Misc
      "cursor-pointer",
    ],
  },
  nextbutton: {
    class: [
      "relative",

      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-8 h-8",
      "p-0 m-0",

      // Shape
      "rounded-full",

      // Colors
      "text-gray-600 dark:text-white/70",
      "border-0",
      "bg-transparent",

      // Transitions
      "transition-colors duration-200 ease-in-out",

      // States
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",

      // Misc
      "cursor-pointer overflow-hidden",
    ],
  },
  table: {
    class: [
      // Font
      "text-base leading-none",
      // Size & Shape
      "border-collapse",
      "w-full",

      // Spacing
      "m-0 my-2",
    ],
  },
  tableheadercell: {
    class: [
      // Spacing
      "p-0 md:p-2",
    ],
  },
  weekheader: {
    class: [
      "leading-5",
      "text-gray-600 dark:text-white/70",
      "opacity-60 cursor-default",
    ],
  },
  weeknumber: {
    class: ["text-gray-600 dark:text-white/70", "opacity-60 cursor-default"],
  },
  weekday: {
    class: [
      // Colors
      "text-gray-500 dark:text-white/60",
    ],
  },
  day: {
    class: [
      // Spacing
      "p-0 md:p-2",
    ],
  },
  weeklabelcontainer: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",

      // Shape & Size
      "w-10 h-10",
      "rounded-full",
      "border-transparent border",

      // Colors
      {
        "text-gray-600 dark:text-white/70 bg-transparent":
          !context.selected && !context.disabled,
        "text-brand-700 bg-brand-100": context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-800/80":
          !context.selected && !context.disabled,
        "hover:bg-brand-200": context.selected && !context.disabled,
      },
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  daylabel: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",

      // Shape & Size
      "w-10 h-10",
      "rounded-full",
      "border-transparent border",

      // Colors
      {
        "text-brand-500 dark:text-brand-400": context.date.today,
        "text-gray-600 dark:text-white/70 bg-transparent":
          !context.selected && !context.disabled && !context.date.today,
        "text-brand-700 bg-brand-100 dark:text-gray-0 dark:bg-brand-300/40":
          context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80":
          !context.selected && !context.disabled,
        "hover:bg-brand-200 dark:hover:bg-brand-200/40":
          context.selected && !context.disabled,
      },
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  monthpicker: {
    class: [
      // Spacing
      "my-2",
    ],
  },
  month: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-1/3",
      "p-2",

      // Shape
      "rounded-md",

      // Colors
      {
        "text-gray-600 dark:text-white/70 bg-transparent":
          !context.selected && !context.disabled,
        "text-brand-700 bg-brand-100 dark:text-gray-0 dark:bg-brand-300/40":
          context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80":
          !context.selected && !context.disabled,
        "hover:bg-brand-200 dark:hover:bg-brand-200/40":
          context.selected && !context.disabled,
      },

      // Misc
      "cursor-pointer",
    ],
  }),
  yearpicker: {
    class: [
      // Spacing
      "my-2",
    ],
  },
  year: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-1/3",
      "p-2",

      // Shape
      "rounded-md",

      // Colors
      {
        "text-gray-600 dark:text-white/70 bg-transparent":
          !context.selected && !context.disabled,
        "text-brand-700 bg-brand-100 dark:text-gray-0 dark:bg-brand-300/40":
          context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 dark:focus:ring-brand-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80":
          !context.selected && !context.disabled,
        "hover:bg-brand-200 dark:hover:bg-brand-200/40":
          context.selected && !context.disabled,
      },

      // Misc
      "cursor-pointer",
    ],
  }),
  timepicker: {
    class: [
      // Flexbox
      "flex",
      "justify-center items-center",

      // Borders
      "border-t-1",
      "border-solid border-gray-200",

      // Spacing
      "p-2",
    ],
  },
  separatorcontainer: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  separator: {
    class: [
      // Text
      "text-xl",
    ],
  },
  hourpicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  minutepicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  secondPicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  ampmpicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  incrementbutton: {
    class: [
      "relative",

      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-8 h-8",
      "p-0 m-0",

      // Shape
      "rounded-full",

      // Colors
      "text-gray-600 dark:text-white/70",
      "border-0",
      "bg-transparent",

      // Transitions
      "transition-colors duration-200 ease-in-out",

      // States
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",

      // Misc
      "cursor-pointer overflow-hidden",
    ],
  },
  decrementbutton: {
    class: [
      "relative",

      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-8 h-8",
      "p-0 m-0",

      // Shape
      "rounded-full",

      // Colors
      "text-gray-600 dark:text-white/70",
      "border-0",
      "bg-transparent",

      // Transitions
      "transition-colors duration-200 ease-in-out",

      // States
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",

      // Misc
      "cursor-pointer overflow-hidden",
    ],
  },
  groupcontainer: {
    class: [
      // Flexbox
      "flex",
    ],
  },
  group: {
    class: [
      // Flexbox and Sizing
      "flex-1",

      // Borders
      "border-l",
      "border-gray-200",

      // Spacing
      "pr-0.5",
      "pl-0.5",
      "pt-0",
      "pb-0",

      // Pseudo-Classes
      "first:pl-0",
      "first:border-l-0",
    ],
  },
  buttonbar: {
    class: [
      // Flexbox
      "flex justify-between items-center",

      // Spacing
      "py-3 px-0",

      // Shape
      "border-t border-gray-200 dark:border-gray-700",
    ],
  },
  todaybutton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",

        // Spacing
        "px-4 py-3 leading-none",

        // Shape
        "rounded-md",

        // Colors
        "bg-transparent border-transparent",
        "text-brand-500 dark:text-brand-400",

        // Transitions
        "transition-colors duration-200 ease-in-out",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-brand-300/20",

        // Misc
        "cursor-pointer",
      ],
    },
  },
  clearbutton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",

        // Spacing
        "px-4 py-3 leading-none",

        // Shape
        "rounded-md",

        // Colors
        "bg-transparent border-transparent",
        "text-brand-500 dark:text-brand-400",

        // Transitions
        "transition-colors duration-200 ease-in-out",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-brand-300/20",

        // Misc
        "cursor-pointer",
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
