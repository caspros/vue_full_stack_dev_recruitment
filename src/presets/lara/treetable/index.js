export default {
  root: ({ props }) => ({
    class: [
      "relative",
      {
        "flex flex-col h-full": props.scrollHeight === "flex",
      },
    ],
  }),
  loadingoverlay: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",

      // Flex & Alignment
      "flex items-center justify-center",

      // Size
      "w-full h-full",

      // Color
      "bg-gray-100/40 dark:bg-gray-800/40",

      // Transition
      "transition duration-200",
    ],
  },
  loadingicon: {
    class: "w-8 h-8 animate-spin",
  },
  wrapper: ({ props }) => ({
    class: [
      // Overflow
      {
        "relative overflow-auto": props.scrollable,
        "overflow-x-auto": props.resizableColumns,
      },
    ],
  }),
  header: ({ props }) => ({
    class: [
      "font-bold",

      // Shape
      props.showGridlines
        ? "border-x border-t border-b-0"
        : "border-y border-x-0",

      // Spacing
      "p-4",

      // Color
      "bg-gray-50 dark:bg-gray-800",
      "border-gray-200 dark:border-gray-700",
      "text-gray-700 dark:text-white/80",
    ],
  }),
  footer: {
    class: [
      // Background, Border & Text
      "bg-slate-50 text-slate-700",
      "border border-x-0 border-t-0 border-gray-50",
      // Padding & Font
      "p-4 font-bold",
      // Dark Mode
      "dark:bg-gray-900 dark:text-white/70 dark:border-gray-700",
    ],
  },
  table: {
    class: [
      // Table & Width
      "border-collapse table-fixed w-full ",
    ],
  },
  thead: ({ props }) => ({
    class: [
      // Position & Z-index
      {
        "top-0 z-40 sticky": props.scrollable,
      },
    ],
  }),
  tbody: ({ props }) => ({
    class: [
      // Block Display
      {
        block: props.scrollable,
      },
    ],
  }),
  tfoot: ({ props }) => ({
    class: [
      // Block Display
      {
        block: props.scrollable,
      },
    ],
  }),
  headerrow: ({ props }) => ({
    class: [
      // Flexbox & Width
      {
        "flex flex-nowrap w-full": props.scrollable,
      },
    ],
  }),
  row: ({ context, props }) => ({
    class: [
      // Flex
      { "flex flex-nowrap w-full": context.scrollable },

      // Color
      "dark:text-white/80",
      {
        "bg-brand-50 text-brand-700 dark:bg-brand-400/30": context.selected,
      },
      {
        "bg-gray-0 text-gray-600 dark:bg-gray-800": !context.selected,
      },

      // Hover & Flexbox
      {
        "hover:bg-gray-300/20 hover:text-gray-600":
          context.selectable && !context.selected,
      },
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-brand-400/50 ring-inset dark:focus:ring-brand-300/50",

      // Transition
      {
        "transition duration-200":
          (props.selectionMode && !context.selected) || props.rowHover,
      },
    ],
  }),
  headercell: ({ context, props }) => ({
    class: [
      "font-bold",

      // Position
      {
        "sticky z-40":
          context.scrollable &&
          context.scrollDirection === "both" &&
          context.frozen,
      },

      // Flex & Alignment
      {
        "flex flex-1 items-center": context.scrollable,
        "flex-initial shrink-0":
          context.scrollable &&
          context.scrollDirection === "both" &&
          !context.frozen,
      },
      "text-left",

      // Shape
      { "first:border-l border-y border-r": context?.showGridlines },
      "border-0 border-b border-solid",

      // Spacing
      context?.size === "small"
        ? "p-2"
        : context?.size === "large"
          ? "p-5"
          : "p-4",

      // Color
      (props.sortable === "" || props.sortable) && context.sorted
        ? "bg-brand-50 text-brand-700"
        : "bg-gray-50 text-gray-700",
      (props.sortable === "" || props.sortable) && context.sorted
        ? "dark:text-white dark:bg-brand-400/30"
        : "dark:text-white/80 dark:bg-gray-800",
      "border-gray-200 dark:border-gray-700",

      // States
      {
        "hover:bg-gray-100 dark:hover:bg-gray-400/30":
          (props.sortable === "" || props.sortable) && !context?.sorted,
      },
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50",

      // Transition
      { "transition duration-200": props.sortable === "" || props.sortable },

      // Misc
      {
        "overflow-hidden relative bg-clip-padding":
          context.resizable && !context.frozen,
      },
    ],
  }),
  column: {
    headercell: ({ context, props }) => ({
      class: [
        "font-bold",

        // Position
        {
          "sticky z-40":
            context.scrollable &&
            context.scrollDirection === "both" &&
            context.frozen,
        },

        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0":
            context.scrollable &&
            context.scrollDirection === "both" &&
            !context.frozen,
        },
        "text-left",

        // Shape
        { "first:border-l border-y border-r": context?.showGridlines },
        "border-0 border-b border-solid",

        // Spacing
        context?.size === "small"
          ? "p-2"
          : context?.size === "large"
            ? "p-5"
            : "p-4",

        // Color
        (props.sortable === "" || props.sortable) && context.sorted
          ? "bg-brand-50 text-brand-700"
          : "bg-gray-50 text-gray-700",
        (props.sortable === "" || props.sortable) && context.sorted
          ? "dark:text-white dark:bg-brand-400/30"
          : "dark:text-white/80 dark:bg-gray-800",
        "border-gray-200 dark:border-gray-700",

        // States
        {
          "hover:bg-gray-100 dark:hover:bg-gray-400/30":
            (props.sortable === "" || props.sortable) && !context?.sorted,
        },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50",

        // Transition
        { "transition duration-200": props.sortable === "" || props.sortable },

        // Misc
        {
          "overflow-hidden relative bg-clip-padding":
            context.resizable && !context.frozen,
        },
      ],
    }),
    bodycell: ({ context }) => ({
      class: [
        // Position
        {
          sticky:
            context.scrollable &&
            context.scrollDirection === "both" &&
            context.frozen,
        },

        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0":
            context.scrollable &&
            context.scrollDirection === "both" &&
            !context.frozen,
        },
        "text-left",

        // Shape
        "border-0 border-b border-solid",
        "border-gray-200 dark:border-gray-700",
        {
          "border-x-0 border-l-0": !context.showGridlines,
        },
        { "first:border-l border-r border-b": context?.showGridlines },

        // Color
        "bg-gray-0 dark:bg-gray-800",

        // Spacing
        context?.size === "small"
          ? "p-2"
          : context?.size === "large"
            ? "p-5"
            : "p-4",

        // Misc
        "dark:border-gray-700",
        {
          "cursor-pointer": context.selectable,
          sticky:
            context.scrollable &&
            context.scrollDirection === "both" &&
            context.frozen,
          "border-x-0 border-l-0": !context.showGridlines,
        },
      ],
    }),
    rowtoggler: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left align-middle",

        // Spacing
        "m-0 mr-2 p-0",

        // Size
        "w-8 h-8",

        // Shape
        "border-0 rounded-full",

        // Color
        "text-gray-500 dark:text-white/70",
        "bg-transparent",

        // States
        "hover:bg-gray-50 dark:hover:bg-gray-700",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring focus-visible:ring-brand-400/50 dark:focus-visible:ring-brand-300/50",

        // Transition
        "transition duration-200",

        // Misc
        "overflow-hidden",
        "cursor-pointer select-none",
      ],
    },
    sorticon: ({ context }) => ({
      class: [
        "ml-2 inline-block",
        context.sorted
          ? "fill-brand-700 dark:fill-white/80"
          : "fill-gray-700 dark:fill-white/70",
      ],
    }),
    sortbadge: {
      class: [
        // Flex & Alignment
        "inline-flex items-center justify-center align-middle",

        // Shape
        "rounded-full",

        // Size
        "w-[1.143rem] leading-[1.143rem]",

        // Spacing
        "ml-2",

        // Color
        "text-brand-700 dark:text-white",
        "bg-brand-50 dark:bg-brand-400/30",
      ],
    },
    columnresizer: {
      class: [
        "block",

        // Position
        "absolute top-0 right-0",

        // Sizing
        "w-2 h-full",

        // Spacing
        "m-0 p-0",

        // Color
        "border border-transparent",

        // Misc
        "cursor-col-resize",
      ],
    },
    rowCheckbox: {
      root: {
        class: [
          "relative",

          // Alignment
          "inline-flex",
          "align-middle",

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
            "peer-hover:bg-brand-700 dark:peer-hover:bg-brand-300 peer-hover:border-brand-700 dark:peer-hover:border-brand-300":
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

    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass:
        "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0",
    },
  },
  resizehelper: {
    class: "absolute hidden w-[2px] z-20 bg-brand-500 dark:bg-brand-400",
  },
};
