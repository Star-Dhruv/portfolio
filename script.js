/* =========================================================
   DHRUV KHARADI — PROFESSIONAL PORTFOLIO
   OPTIMIZED JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector(".navbar");

    const sections = document.querySelectorAll("main section");
    const navItems = document.querySelectorAll(".nav-links a");

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    const profileImage = document.querySelector(".hero-image img");

    const year = document.getElementById("year");



    /* =====================================================
       DEVICE / MOTION SETTINGS
    ===================================================== */

    const isMobile = window.matchMedia(
        "(max-width: 650px)"
    ).matches;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuBtn && navLinks) {

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuBtn.textContent =
                isOpen ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* Close menu after clicking a link */

        navItems.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                navLinks.classList.remove("open");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveLink() {

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-text, " +
            ".about-info, " +
            ".skill-card, " +
            ".services-grid article, " +
            ".project-card, " +
            ".timeline-item, " +
            ".contact-grid"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       STAGGER ANIMATION FOR CARDS
    ===================================================== */

    const cardGroups = [
        ".skill-card",
        ".services-grid article",
        ".project-card",
        ".timeline-item"
    ];


    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            /*
               Mobile par transition delay kam rakho.
               Desktop par original stagger effect.
            */

            const delay =
                isMobile
                    ? index * 40
                    : index * 80;

            card.style.transitionDelay =
                `${delay}ms`;

        });

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const messageInput =
                    document.getElementById("message");


                if (
                    !nameInput ||
                    !emailInput ||
                    !messageInput
                ) {

                    return;

                }


                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const message =
                    messageInput.value.trim();


                /* Empty fields */

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showFormMessage(
                        "Please fill in all fields.",
                        "error"
                    );

                    return;

                }


                /* Email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                /* Success */

                showFormMessage(
                    `Thank you, ${name}! Your message is ready to send.`,
                    "success"
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       FORM MESSAGE FUNCTION
    ===================================================== */

    function showFormMessage(message, type) {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.classList.remove(
            "success",
            "error"
        );

        formMessage.classList.add(type);

        formMessage.style.color =
            type === "success"
                ? "#55d89a"
                : "#ff7272";

    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PROFILE IMAGE FALLBACK
    ===================================================== */

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

                const imageContainer =
                    profileImage.closest(
                        ".hero-image"
                    );

                if (imageContainer) {

                    imageContainer.classList.add(
                        "image-error"
                    );

                }

            }
        );

    }


    /* =====================================================
       PROJECT BUTTON FEEDBACK
    ===================================================== */

    const projectLinks =
        document.querySelectorAll(
            ".project-link"
        );


    projectLinks.forEach(link => {

        link.addEventListener("click", () => {

            link.classList.add("clicked");

            setTimeout(() => {

                link.classList.remove("clicked");

            }, 500);

        });

    });


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, form button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                /*
                   Mobile par ripple disable.
                   Isse unnecessary DOM creation
                   aur animation avoid hogi.
                */

                if (isMobile) {
                    return;
                }


                const ripple =
                    document.createElement("span");

                ripple.classList.add(
                    "button-ripple"
                );

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains("open")
            ) {

                navLinks.classList.remove("open");

                if (menuBtn) {

                    menuBtn.textContent = "☰";

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuBtn.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c Dhruv Kharadi | Portfolio ",
        "background:#4f8cff;color:white;padding:8px 12px;border-radius:6px;font-weight:bold;"
    );

    console.log(
        "Portfolio loaded successfully."
    );

});


/* =========================================================
   HERO NUMBER COUNTER
   MOBILE OPTIMIZED
========================================================= */

const counters =
    document.querySelectorAll(".counter");


const startCounters = () => {

    const isMobile =
        window.matchMedia(
            "(max-width: 650px)"
        ).matches;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);


        /*
           MOBILE / REDUCED MOTION

           Directly show final value.
           No requestAnimationFrame loop.
        */

        if (
            isMobile ||
            reducedMotion
        ) {

            counter.textContent =
                target;

            return;

        }


        /* DESKTOP COUNTER ANIMATION */

        const duration = 1000;

        const startTime =
            performance.now();


        function animate(time) {

            const progress =
                Math.min(
                    (time - startTime) /
                    duration,
                    1
                );


            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            counter.textContent =
                Math.floor(
                    easedProgress * target
                );


            if (progress < 1) {

                requestAnimationFrame(
                    animate
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            animate
        );

    });

};


/*
   Load counter after page is ready.
   No extra 300ms timeout.
*/

window.addEventListener(
    "load",
    startCounters
);

/* =========================================================
   DARK / LIGHT THEME ONLY
========================================================= */

const themeToggle =
    document.getElementById("theme-toggle");

const savedTheme =
    localStorage.getItem("portfolio-theme");


/* Load saved theme */

if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
}


/* Update icon */

function updateThemeIcon() {

    if (!themeToggle) return;

    const isLight =
        document.documentElement.classList.contains(
            "light-mode"
        );

    themeToggle.textContent =
        isLight ? "☀️" : "🌙";
}


/* Initial icon */

updateThemeIcon();


/* Toggle */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.documentElement.classList.toggle(
            "light-mode"
        );

        const isLight =
            document.documentElement.classList.contains(
                "light-mode"
            );

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}
/* =========================================================
   LIGHT / DARK MODE TOGGLE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const toggleButton = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    if (!toggleButton) return;

    // Load saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeIcon.textContent = "☀️";
        themeText.textContent = "Light";
    } else {
        document.body.classList.remove("light-mode");
        themeIcon.textContent = "🌙";
        themeText.textContent = "Dark";
    }

    // Toggle theme
    toggleButton.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        if (isLight) {

            themeIcon.textContent = "☀️";
            themeText.textContent = "Light";

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        } else {

            themeIcon.textContent = "🌙";
            themeText.textContent = "Dark";

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );
        }
    });

});
