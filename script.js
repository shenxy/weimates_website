const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const navLinks = navPanel?.querySelectorAll("a") ?? [];

const syncHeader = () => {
  header?.classList.toggle("is-solid", window.scrollY > 24);
};

const closeNav = () => {
  navPanel?.classList.remove("is-open");
  navToggle?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
  header?.classList.remove("is-solid-locked");
};

const toggleNav = () => {
  if (!navPanel || !navToggle) {
    return;
  }

  const isOpen = navPanel.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
  header?.classList.toggle("is-solid-locked", isOpen);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
  revealObserver.observe(item);
});

navToggle?.addEventListener("click", toggleNav);

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeNav();
  }
});

window.addEventListener("scroll", syncHeader, { passive: true });

syncHeader();
