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
