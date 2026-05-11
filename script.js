const body = document.body;
const glow = document.querySelector(".cursor-glow");
const reveals = document.querySelectorAll(".reveal");
const themeToggle = document.querySelector(".theme-toggle");

document.documentElement.classList.add("motion-ready");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.transform = `translate3d(${event.clientX - 144}px, ${event.clientY - 144}px, 0)`;
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((element) => {
  if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
    element.classList.add("visible");
  }
  observer.observe(element);
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("jay-portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("jay-portfolio-theme") === "dark") {
  body.classList.add("dark");
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  });
});
