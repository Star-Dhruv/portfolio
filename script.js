/* =========================================================
   DHRUV KHARADI — PROFESSIONAL PORTFOLIO
   CLEAN + OPTIMIZED JAVASCRIPT
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
       DEVICE / MOTION
    ===================================================== */

    const isMobile = window.matchMedia(
        "(max-width: 650px)"
    ).matches;

    const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* =====================================================
       SECTION SCROLL
       Navbar ke neeche section proper position par aayega
    ===================================================== */

    function scrollToSection(id, updateHash = true) {

        if (!id) return;

        const target = document.getElementById(id);

        if (!target) return;

        /*
           Desktop = 90px
           Mobile  = 75px

           Isse navbar section ko cover nahi karega.
        */

        const offset =
            window.innerWidth <= 650
                ? 75
                : 90;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: reducedMotionQuery.matches
                ? "auto"
                : "smooth"
        });

        if (updateHash) {

            history.pushState(
                null,
                "",
                "#" + id
            );

        }
    }

    /* =====================================================
       ALL INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#" ||
                    href.length <= 1
                ) {
                    return;
                }

                const id =
                    href.substring(1);

                const target =
                    document.getElementById(id);

                if (!target) return;

                event.preventDefault();

                scrollToSection(id);

            }
        );

    });

    /* =====================================================
       HANDLE PAGE LOAD WITH HASH
       Example:
       website.com/#projects
    ===================================================== */

    if (window.location.hash) {

        const id =
            window.location.hash.substring(1);

        setTimeout(() => {

            scrollToSection(
                id,
                false
            );

        }, 100);

    }

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function closeMobileMenu() {

        if (!navLinks) return;

        navLinks.classList.remove(
            "open"
        );

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

    if (
        menuBtn &&
        navLinks
    ) {

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isOpen =
                    navLinks.classList.toggle(
                        "open"
                    );

                menuBtn.textContent =
                    isOpen
                        ? "✕"
                        : "☰";

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

            }
        );

        /* Close after clicking link */

        navItems.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        });

        /* Close outside menu */

        document.addEventListener(
            "click",
            event => {

                if (
                    navLinks.classList.contains(
                        "open"
                    ) &&
                    !navLinks.contains(
                        event.target
                    ) &&
                    !menuBtn.contains(
                        event.target
                    )
                ) {

                    closeMobileMenu();

                }

            }
        );

    }

    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );

    updateNavbar();

    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveLink() {

        let currentSection =
            "home";

        const offset =
            window.innerWidth <= 650
                ? 75
                : 90;

        sections.forEach(
            section => {

                const sectionTop =
                    section.getBoundingClientRect().top +
                    window.scrollY -
                    offset -
                    20;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );

        navItems.forEach(
            link => {

                link.classList.remove(
                    "active"
                );

                const target =
                    link.getAttribute(
                        "href"
                    );

                if (
                    target ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }

    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
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

    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );

    if (
        "IntersectionObserver" in window &&
        !reducedMotionQuery.matches
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

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

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

    }

    /* =====================================================
       CARD STAGGER
    ===================================================== */

    const cardGroups = [
        ".skill-card",
        ".services-grid article",
        ".project-card",
        ".timeline-item"
    ];

    cardGroups.forEach(
        selector => {

            const cards =
                document.querySelectorAll(
                    selector
                );

            cards.forEach(
                (card, index) => {

                    const delay =
                        isMobile
                            ? index * 40
                            : index * 80;

                    card.style.transitionDelay =
                        `${delay}ms`;

                }
            );

        }
    );

    /* =====================================================
       CONTACT FORM
    ===================================================== */

  /* =====================================================
   CONTACT FORM — GOOGLE SHEETS
===================================================== */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyPwcBo5XwOkcloKg1cd-imVLgLJtVE6D1XmcK8_WqRS0M8I3x31vXwqdwYzjQuZxdC/exec";


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

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


            /* ==============================
               VALIDATION
            ============================== */

            if (!name || !email || !message) {

                showFormMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            /* ==============================
               BUTTON
            ============================== */

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            const originalText =
                submitButton
                    ? submitButton.textContent
                    : "Send Message →";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";
            }


            /* ==============================
               SEND TO GOOGLE SHEETS
            ============================== */

            try {

                const formData =
                    new URLSearchParams();

                formData.append(
                    "name",
                    name
                );

                formData.append(
                    "email",
                    email
                );

                formData.append(
                    "message",
                    message
                );


                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",
                        body: formData,
                        mode: "no-cors"
                    }
                );


                /* ==========================
                   SUCCESS
                ========================== */

                showFormMessage(
                    "Message sent successfully! ✓",
                    "success"
                );

                contactForm.reset();


            } catch (error) {

                console.error(
                    "Google Sheets Error:",
                    error
                );

                showFormMessage(
                    "Something went wrong. Please try again.",
                    "error"
                );

            }


            /* ==============================
               RESTORE BUTTON
            ============================== */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    originalText;

            }

        }
    );

}

    /* =====================================================
       FORM MESSAGE
    ===================================================== */

    function showFormMessage(
        message,
        type
    ) {

        if (!formMessage) return;

        formMessage.textContent =
            message;

        formMessage.classList.remove(
            "success",
            "error"
        );

        formMessage.classList.add(
            type
        );

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

                if (
                    imageContainer
                ) {

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

    projectLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    link.classList.add(
                        "clicked"
                    );

                    setTimeout(
                        () => {

                            link.classList.remove(
                                "clicked"
                            );

                        },
                        500
                    );

                }
            );

        }
    );

    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, form button"
        );

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function(event) {

                    /* Mobile par disable */

                    if (
                        isMobile ||
                        reducedMotionQuery.matches
                    ) {

                        return;

                    }

                    const ripple =
                        document.createElement(
                            "span"
                        );

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
                        `${event.clientX -
                        rect.left -
                        size / 2}px`;

                    ripple.style.top =
                        `${event.clientY -
                        rect.top -
                        size / 2}px`;

                    this.appendChild(
                        ripple
                    );

                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );

    /* =====================================================
       ESC — CLOSE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains(
                    "open"
                )
            ) {

                closeMobileMenu();

            }

        }
    );

    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    if (
        reducedMotionQuery.matches
    ) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }

    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggle =
        document.getElementById(
            "theme-toggle"
        ) ||
        document.getElementById(
            "themeToggle"
        );

    const themeIcon =
        document.getElementById(
            "themeIcon"
        );

    const themeText =
        document.getElementById(
            "themeText"
        );

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );

    function setTheme(
        isLight
    ) {

        document.documentElement.classList.toggle(
            "light-mode",
            isLight
        );

        document.body.classList.toggle(
            "light-mode",
            isLight
        );

        if (themeIcon) {

            themeIcon.textContent =
                isLight
                    ? "☀️"
                    : "🌙";

        }

        if (themeText) {

            themeText.textContent =
                isLight
                    ? "Light"
                    : "Dark";

        }

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(isLight)
            );

        }

    }

    /* Load saved theme */

    setTheme(
        savedTheme === "light"
    );

    /* Theme toggle */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    !document.documentElement.classList.contains(
                        "light-mode"
                    );

                setTheme(
                    isLight
                );

                localStorage.setItem(
                    "portfolio-theme",
                    isLight
                        ? "light"
                        : "dark"
                );

            }
        );

    }

    /* =====================================================
       CONSOLE
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
========================================================= */

window.addEventListener(
    "load",
    () => {

        const counters =
            document.querySelectorAll(
                ".counter"
            );

        const isMobile =
            window.matchMedia(
                "(max-width: 650px)"
            ).matches;

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset.target
                    );

                /* Mobile / reduced motion */

                if (
                    isMobile ||
                    reducedMotion
                ) {

                    counter.textContent =
                        target;

                    return;

                }

                /* Desktop animation */

                const duration =
                    1000;

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
                            easedProgress *
                            target
                        );

                    if (
                        progress < 1
                    ) {

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

            }
        );

    }
);


