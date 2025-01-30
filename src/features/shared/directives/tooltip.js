export const tooltip = {
  updated(el, binding) {
    if (el._v_destroyTooltip) {
      el._v_destroyTooltip();
    }
    handleTooltip(el, binding);
  },
  mounted(el, binding) {
    handleTooltip(el, binding);
  },
  unmounted(el) {
    if (el._v_destroyTooltip) {
      el._v_destroyTooltip();
    }
  },
};

const handleTooltip = (el, binding) => {
  if (!binding || !binding.value) {
    return;
  }
  let tooltip;

  const openTooltip = () => {
    if (tooltip) return;

    tooltip = document.createElement("div");
    tooltip.className =
      "vue-tooltip bg-gray-700 text-white px-4 py-2 rounded-lg absolute opacity-0 text-xs font-medium min-h-[22px] max-w-[266px] font-inter transition-opacity duration-300 z-50";
    tooltip.innerText = binding.value;

    // Tworzymy trójkącik za pomocą diva i klas Tailwind
    const triangle = document.createElement("div");
    triangle.className =
      "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-b-3 border-gray-700";
    tooltip.appendChild(triangle);

    document.body.appendChild(tooltip);

    // Używamy requestAnimationFrame, aby odłożyć obliczenia pozycji do momentu, gdy przeglądarka jest gotowa do przerysowania.
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth;
      const left =
        rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
      const top = rect.top + window.scrollY - tooltip.offsetHeight - 5;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;

      setTimeout(() => {
        tooltip.style.opacity = "1";
      }, 10);
    });
  };

  const closeTooltip = () => {
    if (tooltip) {
      tooltip.style.opacity = "0";
      setTimeout(() => {
        if (!binding.modifiers.permanent && tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      }, 300); // czas trwania przejścia w CSS (duration-300)
    }
  };

  if (binding.modifiers.permanent) {
    openTooltip();
  } else {
    el.addEventListener("mouseenter", openTooltip);
    el.addEventListener("mouseleave", closeTooltip);
  }

  el._v_destroyTooltip = () => {
    el.removeEventListener("mouseenter", openTooltip);
    el.removeEventListener("mouseleave", closeTooltip);
    closeTooltip();
  };
};
