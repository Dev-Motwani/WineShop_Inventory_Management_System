// === layout.js ===
// Global sidebar toggle & reusable behavior for all pages

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".menu-toggle");
  const content = document.querySelector(".content");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");

      // Optional: Dim background when sidebar is open on mobile
      if (sidebar.classList.contains("active")) {
        content.classList.add("dimmed");
      } else {
        content.classList.remove("dimmed");
      }
    });
  }
});
