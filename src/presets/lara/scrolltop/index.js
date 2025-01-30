export default {
  root: ({ props }) => ({
    class: [
      // Flex & Alignment
      "flex items-center justify-center",

      // Positioning
      {
        sticky: props.target === "parent",
        fixed: props.target === "window",
      },
      "bottom-[20px] right-[20px]",
      "ml-auto",

      // Shape & Size
      {
        "rounded-md h-8 w-8": props.target === "parent",
        "h-12 w-12 rounded-full shadow-md": props.target === "window",
      },

      // Color
      "text-white dark:text-gray-900",
      {
        "bg-brand-500 dark:bg-brand-400 hover:bg-brand-600 dark:hover:bg-brand-300":
          props.target === "parent",
        "bg-gray-500 dark:bg-gray-400 hover:bg-gray-600 dark:hover:bg-gray-300":
          props.target === "window",
      },

      // States
      {
        "hover:bg-brand-600 dark:hover:bg-brand-300": props.target === "parent",
        "hover:bg-gray-600 dark:hover:bg-gray-300": props.target === "window",
      },
    ],
  }),
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-150",
    leaveActiveClass: "transition-opacity duration-150",
    leaveToClass: "opacity-0",
  },
};
