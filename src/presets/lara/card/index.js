export default {
  root: {
    class: [
      //Shape
      "rounded-md",
      "shadow-md",

      //Color
      "bg-gray-0 dark:bg-gray-900",
      "text-gray-700 dark:text-gray-0",
    ],
  },
  body: {
    class: "p-5",
  },
  title: {
    class: "text-2xl font-bold mb-2",
  },
  subtitle: {
    class: [
      //Font
      "font-normal",

      //Spacing
      "mb-2",

      //Color
      "text-gray-600 dark:text-gray-0/60",
    ],
  },
  content: {
    class: "py-5", // Vertical padding.
  },
  footer: {
    class: "pt-5", // Top padding.
  },
};
