const flashscreen = document.getElementById("flashscreen");
const siteHeader = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
const quoteText = document.getElementById("quoteText");
const prevQuote = document.getElementById("prevQuote");
const nextQuote = document.getElementById("nextQuote");
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const quotes = [
  "Build things that are useful first, then make them unforgettable.",
  "Good engineering is empathy with measurable behavior.",
  "Design is not decoration. It is how the system explains itself.",
  "A model is only impressive when it helps someone make a better decision."
];

let quoteIndex = 0;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let particles = [];

window.addEventListener("load", () => {
  setTimeout(() => flashscreen.classList.add("is-hidden"), 1250);
});

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 30);
});

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a, button, [data-tilt], .skill-column span").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorRing.style.width = "56px";
    cursorRing.style.height = "56px";
    cursorRing.style.borderColor = "rgba(68, 231, 255, 0.78)";
  });

  element.addEventListener("mouseleave", () => {
    cursorRing.style.width = "34px";
    cursorRing.style.height = "34px";
    cursorRing.style.borderColor = "rgba(216, 255, 63, 0.5)";
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -45% 0px" });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 7}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

function renderQuote() {
  quoteText.animate([
    { opacity: 0, transform: "translateY(12px)" },
    { opacity: 1, transform: "translateY(0)" }
  ], { duration: 320, easing: "ease-out" });
  quoteText.textContent = quotes[quoteIndex];
}

prevQuote.addEventListener("click", () => {
  quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
  renderQuote();
});

nextQuote.addEventListener("click", () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  renderQuote();
});

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(110, Math.floor(window.innerWidth / 13));
  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2.2 + 0.6,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    hue: index % 3
  }));
}

function drawScene() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, index) => {
    const dx = mouseX - particle.x;
    const dy = mouseY - particle.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 150) {
      particle.x -= dx * 0.002;
      particle.y -= dy * 0.002;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -20) particle.x = window.innerWidth + 20;
    if (particle.x > window.innerWidth + 20) particle.x = -20;
    if (particle.y < -20) particle.y = window.innerHeight + 20;
    if (particle.y > window.innerHeight + 20) particle.y = -20;

    const colors = ["rgba(255,63,129,0.55)", "rgba(68,231,255,0.48)", "rgba(216,255,63,0.42)"];
    ctx.beginPath();
    ctx.fillStyle = colors[particle.hue];
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
      const other = particles[otherIndex];
      const gap = Math.hypot(other.x - particle.x, other.y - particle.y);
      if (gap < 92) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.08 - gap / 1400})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawScene);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawScene();
