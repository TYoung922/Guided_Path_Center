document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navControls = document.querySelector(".nav-controls");

  if (menuToggle && navControls) {
    menuToggle.addEventListener("click", () => {
      navControls.classList.toggle("active");

      // Change the icon when menu is open
      if (navControls.classList.contains("active")) {
        menuToggle.textContent = "✕";
      } else {
        menuToggle.textContent = "☰";
      }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll(".nav-controls a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navControls.classList.remove("active");
        menuToggle.textContent = "☰";
      });
    });
  }
});
