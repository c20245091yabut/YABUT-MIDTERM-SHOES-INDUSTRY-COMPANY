
// ==========================================
// YABUT INDUSTRY SHOES COMPANY
// GSAP ANIMATIONS AND INTERACTIONS
// ==========================================

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// ==========================================
// NAVIGATION VISIBILITY
// ==========================================

const navigationLinks = document.querySelectorAll(".nav-link");

gsap.set(navigationLinks, {
    autoAlpha: 1,
    y: 0
});

// ==========================================
// DARK MODE
// ==========================================

const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

function updateDarkModeButton() {
    if (!darkModeToggle) return;

    darkModeToggle.textContent = html.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    html.classList.remove("dark");
} else {
    html.classList.add("dark");
}

updateDarkModeButton();

darkModeToggle?.addEventListener("click", () => {
    html.classList.toggle("dark");

    const currentTheme = html.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", currentTheme);

    updateDarkModeButton();
});

// ==========================================
// INTRO ANIMATION
// ==========================================

const replayButton = document.getElementById("replayBtn");

function playIntro() {
    if (prefersReducedMotion) {
        gsap.set(".brand-intro, .nav-link, .hero-intro", {
            clearProps: "all"
        });
        return;
    }

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    timeline.from(".brand-intro", {
        y: -25,
        opacity: 0,
        duration: 0.7
    });

    timeline.from(".nav-link", {
        y: -15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    }, "-=0.3");

    timeline.from(".hero-intro", {
        y: 35,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    }, "-=0.2");
}

playIntro();

// Replay intro button
replayButton?.addEventListener("click", () => {
    gsap.killTweensOf(".brand-intro, .nav-link, .hero-intro");

    gsap.set(".brand-intro, .nav-link, .hero-intro", {
        clearProps: "all"
    });

    playIntro();
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

if (!prefersReducedMotion) {

    gsap.utils.toArray(".reveal").forEach((section) => {

        gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power2.out",

            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

    });

    // Product cards animation
    gsap.from(".product-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",

        scrollTrigger: {
            trigger: "#products",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

const progressBar = document.getElementById("progressBar");

if (progressBar && !prefersReducedMotion) {

    gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",

        scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });

}

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");

contactForm?.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        formNotice.textContent = "Please complete all fields.";

        formNotice.className =
            "text-sm font-semibold text-red-500";

        return;
    }

    formNotice.textContent =
        `Thank you, ${name}! Your message has been received in this demo.`;

    formNotice.className =
        "text-sm font-semibold text-green-600 dark:text-green-400";

    contactForm.reset();

});

// ==========================================
// REFRESH SCROLL TRIGGERS
// ==========================================

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});
