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

document.querySelectorAll(".carousel-container").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  // Use more robust selectors for nav and indicators
  const nextBtn =
    carousel.querySelector("button.carousel-next") ||
    carousel.querySelector("button:last-of-type");
  const prevBtn =
    carousel.querySelector("button.carousel-prev") ||
    carousel.querySelector("button:first-of-type");
  const indicators = carousel.querySelectorAll(
    ".carousel-indicators > div, .flex.gap-2 > div",
  );
  let currentIdx = 0;

  // Ensure slides are flex and min-w-full for horizontal sliding
  if (track) {
    track.style.display = "flex";
    slides.forEach((slide) => (slide.style.minWidth = "100%"));
    track.style.transition = "transform 0.7s";
  }

  function updateCarousel(index) {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((dot, i) => {
      dot.classList.toggle("bg-primary", i === index);
      dot.classList.toggle("bg-primary/30", i !== index);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIdx = (currentIdx + 1) % slides.length;
      updateCarousel(currentIdx);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIdx = (currentIdx - 1 + slides.length) % slides.length;
      updateCarousel(currentIdx);
    });
  }

  // Indicator click support
  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIdx = i;
      updateCarousel(currentIdx);
    });
  });

  // Simple auto-loop
  setInterval(
    () => {
      currentIdx = (currentIdx + 1) % slides.length;
      updateCarousel(currentIdx);
    },
    5000 + Math.random() * 2000,
  );

  updateCarousel(currentIdx);
});
