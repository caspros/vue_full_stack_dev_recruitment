export default {
  root: ({ props, parent }) => ({
    class: [
      // Display
      "inline-flex",

      { "flex-col": props.showButtons && props.buttonLayout == "vertical" },

      // Shape
      {
        "first:rounded-l-md rounded-none last:rounded-r-md":
          parent.instance.$name == "InputGroup" && !props.showButtons,
      },
      {
        "border-0 border-y border-l last:border-r border-gray-300 dark:border-gray-600":
          parent.instance.$name == "InputGroup" && !props.showButtons,
      },
      {
        "first:ml-0 ml-[-1px]":
          parent.instance.$name == "InputGroup" && !props.showButtons,
      },

      //Sizing
      { "!w-16": props.showButtons && props.buttonLayout == "vertical" },
    ],
  }),
  input: {
    root: ({ parent, context }) => ({
      class: [
        // Display
        "flex flex-auto",

        // Font
        "font-sans leading-none",

        //Text
        {
          "text-center":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        // Spacing
        "p-3",
        "m-0",

        // Shape
        "rounded-lg",
        { "rounded-tr-none rounded-br-none": parent.props.showButtons },
        {
          "rounded-tl-none rounded-bl-none":
            parent.props.showButtons &&
            parent.props.buttonLayout == "horizontal",
        },
        {
          "rounded-none":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        {
          "!rounded-none":
            parent.instance.$parentInstance?.$name == "InputGroup" &&
            !parent.props.showButtons,
        },
        {
          "border-0":
            parent.instance.$parentInstance?.$name == "InputGroup" &&
            !parent.props.showButtons,
        },

        // Colorsh
        "text-gray-600 dark:text-gray-200",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        "bg-gray-0 dark:bg-gray-900",
        "border border-gray-300 dark:border-gray-600",

        // States
        "hover:border-brand-500 dark:hover:border-brand-400",
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-500/50 dark:focus:ring-brand-400/50",
        {
          "opacity-60 select-none pointer-events-none cursor-default":
            context.disabled,
        },

        //Position
        {
          "order-2":
            parent.props.buttonLayout == "horizontal" ||
            parent.props.buttonLayout == "vertical",
        },
      ],
    }),
  },
  buttongroup: ({ props }) => ({
    class: [
      // Flex
      "flex",
      "flex-col",
    ],
  }),

  incrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        "flex flex-auto",

        // Alignment
        "items-center",
        "justify-center",
        "text-center align-bottom",

        //Position
        "relative",
        {
          "order-3":
            parent.props.showButtons &&
            parent.props.buttonLayout == "horizontal",
        },
        {
          "order-1":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        //Color
        "text-white dark:text-gray-900",
        "bg-brand-500 dark:bg-brand-400",
        "border border-brand-500 dark:border-brand-400",

        // Sizing
        "w-[3rem]",
        {
          "px-4 py-3":
            parent.props.showButtons && parent.props.buttonLayout !== "stacked",
        },
        {
          "p-0":
            parent.props.showButtons && parent.props.buttonLayout == "stacked",
        },
        {
          "w-full":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        // Shape
        "rounded-md",
        {
          "rounded-tl-none rounded-br-none rounded-bl-none":
            parent.props.showButtons && parent.props.buttonLayout == "stacked",
        },
        {
          "rounded-bl-none rounded-tl-none":
            parent.props.showButtons &&
            parent.props.buttonLayout == "horizontal",
        },
        {
          "rounded-bl-none rounded-br-none":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        //States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-brand-600 dark:hover:bg-brand-300 hover:border-brand-600 dark:hover:border-brand-300",

        //Misc
        "cursor-pointer overflow-hidden select-none",
      ],
    }),
    label: {
      class: "h-0 w-0",
    },
  },
  decrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        "flex flex-auto",

        // Alignment
        "items-center",
        "justify-center",
        "text-center align-bottom",

        //Position
        "relative",
        {
          "order-1":
            parent.props.showButtons &&
            parent.props.buttonLayout == "horizontal",
        },
        {
          "order-3":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        //Color
        "text-white dark:text-gray-900",
        "bg-brand-500 dark:bg-brand-400",
        "border border-brand-500 dark:border-brand-400",

        // Sizing
        "w-[3rem]",
        {
          "px-4 py-3":
            parent.props.showButtons && parent.props.buttonLayout !== "stacked",
        },
        {
          "p-0":
            parent.props.showButtons && parent.props.buttonLayout == "stacked",
        },
        {
          "w-full":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        // Shape
        "rounded-md",
        {
          "rounded-tr-none rounded-tl-none rounded-bl-none":
            parent.props.showButtons && parent.props.buttonLayout == "stacked",
        },
        {
          "rounded-tr-none rounded-br-none ":
            parent.props.showButtons &&
            parent.props.buttonLayout == "horizontal",
        },
        {
          "rounded-tr-none rounded-tl-none ":
            parent.props.showButtons && parent.props.buttonLayout == "vertical",
        },

        //States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-brand-600 dark:hover:bg-brand-300 hover:border-brand-600 dark:hover:border-brand-300",

        //Misc
        "cursor-pointer overflow-hidden select-none",
      ],
    }),
    label: {
      class: "h-0 w-0",
    },
  },
};
