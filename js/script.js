const profile = document.querySelector(".right img");
const text = document.querySelector(".left");

let ticking = false;

function updateAnimations() {
    const scroll = window.scrollY;

    // Fade the profile image
    profile.style.opacity = Math.max(0, 1 - scroll / 350);

    // Move the text up smoothly
    const move = Math.min(scroll * 0.4, 80);
    text.style.transform = `translate3d(0, -${move}px, 0)`;

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});

// Run once on page load
updateAnimations();
const buttons = document.querySelectorAll(".primary-button");

buttons.forEach(button => {
    button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty("--mouse-x", `${x}px`);
        button.style.setProperty("--mouse-y", `${y}px`);
    });
});
const socialButtons = document.querySelectorAll(".social");

socialButtons.forEach(button => {
    button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty("--mouse-x", `${x}px`);
        button.style.setProperty("--mouse-y", `${y}px`);
    });
});
const testimonialTrack = document.querySelector(".testimonial-track");

const testimonialCards = document.querySelectorAll(".carousel-card");

const previousButton = document.querySelector(".carousel-prev");

const nextButton = document.querySelector(".carousel-next");

const carouselDots = document.querySelectorAll(".carousel-dot");

let currentTestimonial = 0;


function updateCarousel() {

    testimonialCards.forEach((card, index) => {

        card.classList.toggle(
            "active",
            index === currentTestimonial
        );

    });


    carouselDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentTestimonial
        );

    });


    const cardWidth =
        testimonialCards[0].offsetWidth + 24;


    const carouselWidth =
        testimonialTrack.parentElement.offsetWidth;


    const offset =
        (carouselWidth - testimonialCards[0].offsetWidth) / 2
        - currentTestimonial * cardWidth;


    testimonialTrack.style.transform =
        `translateX(${offset}px)`;


    testimonialCards.forEach((card, index) => {

        const video = card.querySelector("video");

        if (index === currentTestimonial) {

            video.play();

        } else {

            video.pause();

        }

    });

}


nextButton.addEventListener("click", () => {

    currentTestimonial++;

    if (currentTestimonial >= testimonialCards.length) {

        currentTestimonial = 0;

    }

    updateCarousel();

});


previousButton.addEventListener("click", () => {

    currentTestimonial--;

    if (currentTestimonial < 0) {

        currentTestimonial =
            testimonialCards.length - 1;

    }

    updateCarousel();

});


carouselDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentTestimonial = index;

        updateCarousel();

    });

});


window.addEventListener(
    "resize",
    updateCarousel
);


updateCarousel();
/* =========================
   SECTION TRANSITION FADE
========================= */

const sections = document.querySelectorAll(
    ".hero, .why-section, .plans-section, .testimonials-section"
);

function updateSectionFade() {

    const viewportHeight = window.innerHeight;

    sections.forEach(section => {

        const rect = section.getBoundingClientRect();

        let opacity = 1;

        /*
        SECTION LEAVING THROUGH THE TOP
        */

        if (rect.bottom < viewportHeight) {

            const fadeDistance = viewportHeight * 0.45;

            opacity = rect.bottom / fadeDistance;

            opacity = Math.max(0, Math.min(1, opacity));

        }

        /*
        SECTION STILL VISIBLE OR ENTERING
        */

        else {

            opacity = 1;

        }

        section.style.opacity = opacity;

    });

}

window.addEventListener(
    "scroll",
    updateSectionFade,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateSectionFade
);

updateSectionFade();
/* =========================
   MOBILE PLANS CAROUSEL
========================= */

const plansGrid = document.querySelector(".plans-grid");
const growthPlan = document.querySelector(".plan-card.recommended");

function centerGrowthPlan() {

    if (
        window.innerWidth <= 900 &&
        plansGrid &&
        growthPlan
    ) {

        const scrollPosition =
            growthPlan.offsetLeft -
            (plansGrid.clientWidth - growthPlan.clientWidth) / 2;

        plansGrid.scrollTo({
            left: scrollPosition,
            behavior: "instant"
        });

    }

}

window.addEventListener(
    "load",
    centerGrowthPlan
);

window.addEventListener(
    "resize",
    centerGrowthPlan
);
/* =========================
   SHRINKING STICKY HEADER
========================= */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});