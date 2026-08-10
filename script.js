
// ================= TYPING EFFECT =================

const text = "Full Stack Developer";

const heading = document.querySelector("#home h2");

let index = 0;

function typeText() {

    if (index < text.length) {

        heading.textContent += text.charAt(index);

        index++;

        setTimeout(typeText, 100);

    }

}

heading.textContent = "";

typeText();


// ================= SCROLL REVEAL =================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


sections.forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});


// ================= MOBILE MENU =================

const nav = document.querySelector("nav");

const menuButton = document.createElement("button");

menuButton.innerHTML = "☰";

menuButton.classList.add("mobile-menu");

nav.appendChild(menuButton);


menuButton.addEventListener("click", () => {

    const menu = document.querySelector("nav ul");

    menu.classList.toggle("active");

});


// ================= CLOSE MENU AFTER CLICK =================

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const menu = document.querySelector("nav ul");

        menu.classList.remove("active");

    });

});


// ================= CONTACT FORM =================

const form = document.querySelector("#contact form");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    alert("Thank you! Your message has been received.");

    form.reset();

});