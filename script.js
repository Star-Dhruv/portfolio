

document.addEventListener("DOMContentLoaded", () => {


    /* ================= MOBILE MENU ================= */

    const menuBtn =
        document.querySelector(".menu-btn");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            menuBtn.textContent =
                navLinks.classList.contains("open")
                    ? "✕"
                    : "☰";

        });


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    menuBtn.textContent = "☰";

                });

            });

    }


    /* ================= ACTIVE NAV ================= */

    const sections =
        document.querySelectorAll("main section");

    const links =
        document.querySelectorAll(".nav-links a");


    function updateActiveLink() {

        let current = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {

                current =
                    section.getAttribute("id");

            }

        });


        links.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href")
                === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".skill-card, " +
            ".services-grid article, " +
            ".project-card, " +
            ".timeline-item, " +
            ".contact-grid"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* ================= CONTACT FORM ================= */

    const form =
        document.getElementById("contact-form");

    const formMessage =
        document.getElementById("form-message");


    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const message =
                document.getElementById("message")
                    .value
                    .trim();


            if (!name || !email || !message) {

                formMessage.textContent =
                    "Please fill in all fields.";

                formMessage.style.color =
                    "#ff7272";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email.";

                formMessage.style.color =
                    "#ff7272";

                return;

            }


            formMessage.textContent =
                "Thank you, " +
                name +
                "! Your message is ready to send.";

            formMessage.style.color =
                "#55d89a";


            form.reset();

        });

    }


    /* ================= FOOTER YEAR ================= */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* ================= IMAGE FALLBACK ================= */

    const profileImage =
        document.querySelector(".hero-image img");


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

            }
        );

    }

});
