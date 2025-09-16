function header_offset() {
  const header = document.querySelector("header");
  return header ? header.offsetTop : 0;
}

function find_current() {
  const candidates = document.querySelectorAll("div.picdump-image-container");

  for (const candidate of candidates) {
    const rect = candidate.getBoundingClientRect();
    const top_visible = rect.top > 0 && rect.top < window.innerHeight
    if (top_visible) {
      return candidate;
    }
  }
  // Fallback to first element if none are visible
  return candidates[0] || document.querySelector("div.picdump-image-container");
}

function get_next(el) {
  let sibling = el.nextElementSibling;

  while (sibling) {
    if (sibling.classList?.contains("picdump-image-container")) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
  return null; // No next article sibling found
}

function get_prev(el) {
  let sibling = el.previousElementSibling;

  while (sibling) {
    if (sibling.classList?.contains("picdump-image-container")) {
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
  const containerOffset = document.querySelector("main.container").offsetTop;

  // Calculate scroll position with offset
  const targetPosition = absoluteTop - containerOffset - offset;

  // Scroll to calculated position
  window.scrollTo({
    top: targetPosition,
  });
}

console.log("isnichwahr scroller loaded");

document.addEventListener('DOMContentLoaded', function() {
  console.log("find current", find_current());
  // console.log("next", get_next(find_current()));
  //
  // jump_to_next();
});

