// ============ TYPING ANIMATION ============
const roles = ["Data Analyst", "ML Enthusiast", "Power BI Developer", "Python Developer"];
const typedTextEl = document.getElementById("typedText");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const TYPE_SPEED = 80;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

function typeLoop() {
  if (!typedTextEl) return;
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    charIndex++;
    typedTextEl.textContent = currentRole.slice(0, charIndex);
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeLoop, PAUSE_AFTER_TYPE);
      return;
    }
    setTimeout(typeLoop, TYPE_SPEED);
  } else {
    charIndex--;
    typedTextEl.textContent = currentRole.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, PAUSE_AFTER_DELETE);
      return;
    }
    setTimeout(typeLoop, DELETE_SPEED);
  }
}

// Respect reduced motion: just show first role statically
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (typedTextEl) {
  if (prefersReducedMotion) {
    typedTextEl.textContent = roles[0];
  } else {
    typeLoop();
  }
}

// ============ MOBILE NAV TOGGLE ============
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinkEls.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

// ============ SCROLL REVEAL ANIMATIONS ============
const revealTargets = document.querySelectorAll(
  ".skill-card, .timeline-item, .project-card, .contact-card, .section-header"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach((el) => observer.observe(el));

// ============ FOOTER YEAR ============
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
