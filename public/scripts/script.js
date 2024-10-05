// Dropdown animation
const componentsToggle = document.getElementById("componentsToggle");
const componentsDropdown = document.getElementById("componentsDropdown");

componentsToggle.addEventListener("click", () => {
  componentsDropdown.classList.toggle("hidden");
  if (componentsDropdown.classList.contains("hidden")) {
    componentsDropdown.style.maxHeight = "0";
  } else {
    componentsDropdown.style.maxHeight = componentsDropdown.scrollHeight + "px";
  }
});
// Responsive sidebar
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarContent = document.getElementById("sidebarContent");
const menuItems = document.querySelectorAll(
  ".menu-item a, .menu-items-container h1"
);
const menuChevrons = document.querySelectorAll(".menu-chevron");
const menuText = document.getElementById("menuText");

function toggleSidebar() {
  sidebar.classList.toggle("-translate-x-full");
}

hamburger.addEventListener("click", toggleSidebar);

// Close sidebar when clicking outside on mobile and tablet
document.addEventListener("click", (e) => {
  if (
    window.innerWidth < 1024 &&
    !sidebar.contains(e.target) &&
    e.target !== hamburger
  ) {
    sidebar.classList.add("-translate-x-full");
  }
});

// Toggle sidebar width on large screens
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("lg:w-16");
  sidebar.classList.toggle("lg:w-72");
  sidebarToggle.classList.toggle("rotate-180");
  sidebarContent.classList.toggle("lg:invisible");
  sidebarContent.classList.toggle("lg:h-0");
  sidebarContent.classList.toggle("lg:overflow-hidden");

  // Toggle menu text visibility
  menuText.classList.toggle("opacity-0");
  menuText.classList.toggle("opacity-100");
});

// Adjust sidebar based on screen size
function adjustSidebar() {
  if (window.innerWidth >= 1024) {
    sidebar.classList.remove("-translate-x-full");
    sidebarToggle.classList.remove("hidden");
    if (sidebar.classList.contains("lg:w-16")) {
      sidebarContent.classList.add(
        "lg:invisible",
        "lg:h-0",
        "lg:overflow-hidden"
      );
      menuText.classList.remove("opacity-0");
      menuText.classList.add("opacity-100");
    } else {
      sidebarContent.classList.remove(
        "lg:invisible",
        "lg:h-0",
        "lg:overflow-hidden"
      );
      menuText.classList.add("opacity-0");
      menuText.classList.remove("opacity-100");
    }
  } else {
    sidebarToggle.classList.add("hidden");
    sidebarContent.classList.remove(
      "lg:invisible",
      "lg:h-0",
      "lg:overflow-hidden"
    );
    menuText.classList.add("opacity-0");
    menuText.classList.remove("opacity-100");
  }
}

window.addEventListener("resize", adjustSidebar);
adjustSidebar(); // Initial call
