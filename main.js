const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

function updateThemeButton() {
  const isDark = htmlElement.classList.contains("dark");
  const icon = themeToggle.querySelector("span");

  if (isDark) {
    icon.textContent = "light_mode";
    themeToggle.classList.remove("text-primary");
    themeToggle.classList.add("text-slate-100");
    themeToggle.classList.remove("hover:text-slate-100");
    themeToggle.classList.add("hover:text-primary");
  } else {
    icon.textContent = "dark_mode";
    themeToggle.classList.remove("text-slate-100");
    themeToggle.classList.add("text-primary");
    themeToggle.classList.remove("hover:text-primary");
    themeToggle.classList.add("hover:text-slate-100");
  }
}

themeToggle.addEventListener("click", () => {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    htmlElement.classList.add("light");
  } else {
    htmlElement.classList.remove("light");
    htmlElement.classList.add("dark");
  }
  updateThemeButton();
  localStorage.setItem(
    "theme",
    htmlElement.classList.contains("dark") ? "dark" : "light",
  );
});

// Initialize button on page load
updateThemeButton();

// Restore saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlElement.classList.remove("dark", "light");
  htmlElement.classList.add(savedTheme);
  updateThemeButton();
}

// Mobile nav toggle
const menuButton = document.getElementById("menu-button");
const mobileNav = document.getElementById("mobile-nav");
const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
const closeButton = mobileNav.querySelector("button");

menuButton.addEventListener("click", () => {
  mobileNav.classList.remove("hidden");
  mobileNavBackdrop.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  mobileNav.classList.add("hidden");
  mobileNavBackdrop.classList.add("hidden");
});

// Close mobile nav when a link is clicked
const navLinks = mobileNav.querySelectorAll("a[href]");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
    mobileNavBackdrop.classList.add("hidden");
  });
});

// Close mobile nav when backdrop is clicked
mobileNavBackdrop.addEventListener("click", () => {
  mobileNav.classList.add("hidden");
  mobileNavBackdrop.classList.add("hidden");
});

// Scroll to top functionality
const scrollBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
