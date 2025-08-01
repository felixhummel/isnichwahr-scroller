function header_offset() {
  return document.querySelector(".main-container").offsetTop;
}

function find_current() {
  const candidates = document.querySelectorAll("div.field-item");

  for (const candidate of candidates) {
    const rect = candidate.getBoundingClientRect();
    // Check if element is visible in viewport (at least partially)
    if (rect.bottom > header_offset() + 20 && rect.top < window.innerHeight) {
      return candidate;
    }
  }

  // Fallback to first element if none are visible
  return candidates[0] || document.querySelector("div.field-item");
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
  const c = find_current();
  console.log("current", c);
  const e = get_next(c);
  console.log("next", e);
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
