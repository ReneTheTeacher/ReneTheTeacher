/* =========================
   HERO ANIMATIONS
========================= */

const profile = document.querySelector(".right img");
const text = document.querySelector(".left");

let ticking = false;

function updateAnimations() {

    if (!profile || !text) {
        return;
    }

    const scroll = window.scrollY;

    profile.style.opacity =
        Math.max(0, 1 - scroll / 350);

    const move =
        Math.min(scroll * 0.4, 80);

    text.style.transform =
        `translate3d(0, -${move}px, 0)`;

    ticking = false;

}

window.addEventListener("scroll", () => {

    if (!ticking) {

        requestAnimationFrame(updateAnimations);

        ticking = true;

    }

});

updateAnimations();


/* =========================
   PRIMARY BUTTON EFFECT
========================= */

const buttons =
    document.querySelectorAll(".primary-button");

buttons.forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect =
            button.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        button.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        button.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

});


/* =========================
   SOCIAL BUTTON EFFECT
========================= */

const socialButtons =
    document.querySelectorAll(".social");

socialButtons.forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect =
            button.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        button.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        button.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

});


/* =========================
   TESTIMONIAL CAROUSEL
========================= */

const testimonialTrack =
    document.querySelector(".testimonial-track");

const testimonialCards =
    document.querySelectorAll(".carousel-card");

const previousButton =
    document.querySelector(".carousel-prev");

const nextButton =
    document.querySelector(".carousel-next");

const carouselDots =
    document.querySelectorAll(".carousel-dot");


if (
    testimonialTrack &&
    testimonialCards.length > 0 &&
    previousButton &&
    nextButton
) {

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
            (carouselWidth -
                testimonialCards[0].offsetWidth) / 2
            -
            currentTestimonial * cardWidth;


        testimonialTrack.style.transform =
            `translateX(${offset}px)`;


        testimonialCards.forEach((card, index) => {

            const video =
                card.querySelector("video");

            if (!video) {
                return;
            }

            if (
                index === currentTestimonial
            ) {

                video.play();

            } else {

                video.pause();

            }

        });

    }


    nextButton.addEventListener(
        "click",
        () => {

            currentTestimonial++;

            if (
                currentTestimonial >=
                testimonialCards.length
            ) {

                currentTestimonial = 0;

            }

            updateCarousel();

        }
    );


    previousButton.addEventListener(
        "click",
        () => {

            currentTestimonial--;

            if (
                currentTestimonial < 0
            ) {

                currentTestimonial =
                    testimonialCards.length - 1;

            }

            updateCarousel();

        }
    );


    carouselDots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                currentTestimonial = index;

                updateCarousel();

            }
        );

    });

    /* =========================
       TOUCH SWIPE
    ========================= */

    let touchStartX = 0;
    let touchEndX = 0;


    testimonialTrack.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    testimonialTrack.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            const swipeDistance =
                touchEndX - touchStartX;


            if (Math.abs(swipeDistance) < 50) {

                return;

            }


            if (swipeDistance < 0) {

                nextButton.click();

            } else {

                previousButton.click();

            }

        },
        { passive: true }
    );
    window.addEventListener(
        "resize",
        updateCarousel
    );


    updateCarousel();

}


/* =========================
   SECTION TRANSITION FADE
========================= */

const sections =
    document.querySelectorAll(
        ".hero, .why-section, .plans-section, .testimonials-section"
    );


function updateSectionFade() {

    const viewportHeight =
        window.innerHeight;


    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        let opacity = 1;


        if (
            rect.bottom < viewportHeight
        ) {

            const fadeDistance =
                viewportHeight * 0.45;

            opacity =
                rect.bottom / fadeDistance;

            opacity =
                Math.max(
                    0,
                    Math.min(1, opacity)
                );

        }


        section.style.opacity =
            opacity;

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

const plansGrid =
    document.querySelector(".plans-grid");

const growthPlan =
    document.querySelector(
        ".plan-card.recommended"
    );


function centerGrowthPlan() {

    if (
        window.innerWidth <= 900 &&
        plansGrid &&
        growthPlan
    ) {

        const scrollPosition =
            growthPlan.offsetLeft -
            (
                plansGrid.clientWidth -
                growthPlan.clientWidth
            ) / 2;


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

const header =
    document.querySelector("header");


if (header) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 80
            ) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}


/* =========================
   TESTIMONIAL VIDEO SOUND
========================= */

const soundButtons =
    document.querySelectorAll(
        ".video-sound-button"
    );


soundButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const video =
                button
                    .closest(
                        ".testimonial-video"
                    )
                    .querySelector(
                        "video"
                    );


            video.muted =
                !video.muted;


            const icon =
                button.querySelector(
                    "i"
                );


            if (
                video.muted
            ) {

                icon.classList.remove(
                    "fa-volume-high"
                );

                icon.classList.add(
                    "fa-volume-xmark"
                );

                button.setAttribute(
                    "aria-label",
                    "Activar sonido"
                );

            } else {

                icon.classList.remove(
                    "fa-volume-xmark"
                );

                icon.classList.add(
                    "fa-volume-high"
                );

                button.setAttribute(
                    "aria-label",
                    "Silenciar"
                );

            }

        }
    );

});


/* =========================
   RESOURCES CAROUSEL
========================= */

const resourceTrack =
    document.querySelector(
        ".resource-carousel-track"
    );

const resourceSlides =
    document.querySelectorAll(
        ".resource-slide"
    );

const resourcePrev =
    document.querySelector(
        ".resource-prev"
    );

const resourceNext =
    document.querySelector(
        ".resource-next"
    );

const resourceDots =
    document.querySelectorAll(
        ".resource-dot"
    );


if (
    resourceTrack &&
    resourceSlides.length > 0 &&
    resourcePrev &&
    resourceNext
) {

    let resourceIndex = 0;


    function updateResourceCarousel() {

        resourceTrack.style.transform =
            `translateX(-${resourceIndex * 100}%)`;


        resourceDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === resourceIndex
                );

            }
        );

    }


    resourceNext.addEventListener(
        "click",
        () => {

            resourceIndex++;


            if (
                resourceIndex >=
                resourceSlides.length
            ) {

                resourceIndex = 0;

            }


            updateResourceCarousel();

        }
    );


    resourcePrev.addEventListener(
        "click",
        () => {

            resourceIndex--;


            if (
                resourceIndex < 0
            ) {

                resourceIndex =
                    resourceSlides.length - 1;

            }


            updateResourceCarousel();

        }
    );


    resourceDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    resourceIndex =
                        index;

                    updateResourceCarousel();

                }
            );

        }
    );


    updateResourceCarousel();

}
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 50) {
        // Swipe left → next
        nextSlide();
    }

    if (touchEndX > touchStartX + 50) {
        // Swipe right → previous
        prevSlide();
    }
});