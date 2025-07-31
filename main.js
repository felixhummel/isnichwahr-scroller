function find_current() {
  // Get the field-item with the most visible area in viewport
  const fieldItems = document.querySelectorAll("div.field-item");
  let maxVisibleArea = 0;
  let bestVisibleElement = null;
  let fully_visible_element = null;

  for (const el of fieldItems) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Check if element is fully visible
    const isFullyVisible =
      rect.top >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.left >= 0 &&
      rect.right <= viewportWidth;

    if (isFullyVisible && !fully_visible_element) {
      fully_visible_element = el;
    }

    // Calculate visible area
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(viewportHeight, rect.bottom);
    const visibleLeft = Math.max(0, rect.left);
    const visibleRight = Math.min(viewportWidth, rect.right);

    // Check if element is visible at all
    if (visibleTop < visibleBottom && visibleLeft < visibleRight) {
      const visibleArea =
        (visibleBottom - visibleTop) * (visibleRight - visibleLeft);

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        bestVisibleElement = el;
      }
    }
  }

  // If we have a fully visible element and it comes before the best visible element, use it
  if (fully_visible_element && bestVisibleElement) {
    const fieldItemsArray = Array.from(fieldItems);
    const fullyVisibleIndex = fieldItemsArray.indexOf(fully_visible_element);
    const bestVisibleIndex = fieldItemsArray.indexOf(bestVisibleElement);

    if (fullyVisibleIndex < bestVisibleIndex) {
      console.log(
        "Fully visible element found before highest visible area element:",
        fully_visible_element
      );
      return fully_visible_element;
    }
  }

  console.log(
    "Visible area:",
    maxVisibleArea,
    "Element with most visible area:",
    bestVisibleElement
  );
  return bestVisibleElement;
}

function get_next(el) {
  let sibling = el.nextElementSibling;

  while (sibling) {
    if (sibling.classList?.contains("field-item")) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }

  return null; // No next sibling with class "field-item" found
}

function get_prev(el) {
  let sibling = el.previousElementSibling;

  while (sibling) {
    if (sibling.classList?.contains("field-item")) {
      return sibling;
    }
    sibling = sibling.previousElementSibling;
  }

  return null; // No previous sibling with class "field-item" found
}

function jump_to_next() {
  const e = get_next(find_current());
  scroll_to(e);
}

function jump_to_prev() {
  const e = get_prev(find_current());
  scroll_to(e);
}

// Bind both "j" and "k" keys
document.addEventListener("keydown", (event) => {
  // Only trigger if not in an input, textarea, or contenteditable element
  if (
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) &&
    !document.activeElement.hasAttribute("contenteditable")
  ) {
    if (event.key === "j") {
      event.preventDefault();
      jump_to_next();
    } else if (event.key === "k") {
      event.preventDefault();
      jump_to_prev();
    }
  }
});

function scroll_to(element, offset = 10) {
  const elementRect = element.getBoundingClientRect();
  const absoluteTop = elementRect.top + window.pageYOffset;
  const containerOffset = document.querySelector(".main-container").offsetTop;

  // Calculate scroll position with offset
  const targetPosition = absoluteTop - containerOffset - offset;

  // Scroll to calculated position
  window.scrollTo({
    top: targetPosition,
  });
}

function scroll_relative(element, containerSelector = ".region", offset = 10) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found`);
    return;
  }

  // Get positions relative to the container
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // Calculate element's position relative to container
  const elementPositionInContainer = elementRect.top - containerRect.top;

  // Calculate new scroll position with offset
  const targetScrollTop =
    container.scrollTop + elementPositionInContainer - offset;

  console.log(
    "scroll_to",
    "container",
    container,
    "positions relative to the container",
    elementRect,
    containerRect,
    "element's position relative to container",
    elementPositionInContainer,
    "new scroll position with offset",
    targetScrollTop
  );

  // Scroll the container
  container.scrollTo({
    top: targetScrollTop,
    behavior: "smooth", // Optional: for smooth scrolling
  });
}

// console.log("find current", find_current());
// console.log("next", get_next(find_current()));
//
// jump_to_next();
