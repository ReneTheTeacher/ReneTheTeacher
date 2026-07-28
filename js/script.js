/* = 
HERO ANIMATIONS 
= */

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


/* = 
PRIMARY BUTTON EFFECT 
= */

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


/* = 
SOCIAL BUTTON EFFECT 
= */

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


/* = 
TESTIMONIAL CAROUSEL 
= */

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

/*
    Only ever keep ONE testimonial video loaded/decoded
    at a time. On iOS, several <video> elements holding
    a decoded frame at once is what causes everything to
    lag by the time you reach the 3rd card. Whichever card
    is not active gets its source fully released.
*/

let testimonialsInView = false;

const carouselVideos =
    Array.from(testimonialCards).map((card) => {

        const video =
            card.querySelector("video");

        const source =
            video ? video.querySelector("source") : null;

        const originalSrc =
            source ? source.getAttribute("src") : null;

        if (source && originalSrc) {
            source.removeAttribute("src");
        }

        if (video) {
            video.load();
        }

        return {
            video,
            source,
            originalSrc,
            hydrated: false
        };

    });


function hydrateVideo(entry) {

    if (
        !entry ||
        !entry.video ||
        !entry.source ||
        entry.hydrated
    ) {
        return;
    }

    if (
        !entry.source.getAttribute("src") &&
        entry.originalSrc
    ) {

        entry.source.src =
            entry.originalSrc;

        entry.video.load();

    }

    entry.hydrated = true;

}


function dehydrateVideo(entry) {

    if (
        !entry ||
        !entry.video ||
        !entry.source ||
        !entry.hydrated
    ) {
        return;
    }

    entry.video.pause();

    entry.video.currentTime = 0;

    /*
        Reset to muted before releasing. Otherwise, next time
        this card is hydrated, the browser tries to autoplay
        it unmuted with no fresh tap behind it — iOS silently
        blocks that, and the video just sits there looking
        frozen. Muted autoplay is always allowed.
    */

    entry.video.muted = true;

    const soundButton =
        entry.video
            .closest(".testimonial-video")
            ?.querySelector(".video-sound-button");

    if (soundButton) {

        const icon =
            soundButton.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-volume-high");
            icon.classList.add("fa-volume-xmark");

        }

        soundButton.setAttribute(
            "aria-label",
            "Activar sonido"
        );

    }

    entry.source.removeAttribute("src");

    entry.video.load();

    entry.hydrated = false;

}


function syncCarouselVideos() {

    carouselVideos.forEach((entry, index) => {

        if (index === currentTestimonial) {

            if (testimonialsInView) {

                hydrateVideo(entry);

                if (entry.video) {

                    entry.video
                        .play()
                        .catch(() => {});

                }

            }

        } else {

            dehydrateVideo(entry);

        }

    });

}


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
        testimonialCards[0].offsetWidth + 8;


    const carouselWidth =
        testimonialTrack.parentElement.offsetWidth;


    const offset =
        (carouselWidth -
            testimonialCards[0].offsetWidth) / 2
        -
        currentTestimonial * cardWidth;


    testimonialTrack.style.transform =
        `translateX(${offset}px)`;


    syncCarouselVideos();

}


/*
    Transition lock. On iOS in-app browsers (Instagram/TikTok)
    a single swipe gesture can sometimes fire more than one
    navigation event. Without this lock, that produces the
    "jumps an extra card" bug. While a slide is in motion
    (matches the .5s CSS transition on .testimonial-track),
    further navigation is ignored.
*/

let isTransitioning = false;


function goToTestimonial(index) {

    if (isTransitioning) {
        return;
    }

    let nextIndex = index;

    if (nextIndex >= testimonialCards.length) {
        nextIndex = 0;
    }

    if (nextIndex < 0) {
        nextIndex = testimonialCards.length - 1;
    }

    if (nextIndex === currentTestimonial) {
        return;
    }

    isTransitioning = true;

    currentTestimonial = nextIndex;

    try {

        updateCarousel();

    } finally {

        setTimeout(() => {
            isTransitioning = false;
        }, 550);

    }

}


nextButton.addEventListener(
    "click",
    () => {

        goToTestimonial(currentTestimonial + 1);

    }
);


previousButton.addEventListener(
    "click",
    () => {

        goToTestimonial(currentTestimonial - 1);

    }
);


carouselDots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {

            goToTestimonial(index);

        }
    );

});

/* =========================
   TOUCH SWIPE
   (registered once, outside updateCarousel,
   so listeners never pile up)
========================= */

let testimonialTouchStartX = 0;
let testimonialTouchStartY = 0;
let testimonialTouchOnButton = false;


testimonialTrack.addEventListener(
    "touchstart",
    (event) => {

        testimonialTouchOnButton =
            !!event.target.closest(
                ".video-sound-button"
            );

        testimonialTouchStartX =
            event.touches[0].clientX;

        testimonialTouchStartY =
            event.touches[0].clientY;

    },
    { passive: true }
);


testimonialTrack.addEventListener(
    "touchend",
    (event) => {

        if (testimonialTouchOnButton) {
            return;
        }

        const touchEndX =
            event.changedTouches[0].clientX;

        const touchEndY =
            event.changedTouches[0].clientY;


        const differenceX =
            testimonialTouchStartX - touchEndX;

        const differenceY =
            testimonialTouchStartY - touchEndY;


        /*
            Ignore vertical scrolling.
            Only treat the gesture as a swipe
            if horizontal movement is greater.
        */

        if (
            Math.abs(differenceX) <=
            Math.abs(differenceY)
        ) {

            return;

        }


        const swipeThreshold = 50;


        if (
            differenceX >
            swipeThreshold
        ) {

            goToTestimonial(currentTestimonial + 1);

        }


        if (
            differenceX <
            -swipeThreshold
        ) {

            goToTestimonial(currentTestimonial - 1);

        }

    },
    { passive: true }
);


window.addEventListener(
    "resize",
    updateCarousel
);


/*
    Only hydrate/play a video once the testimonials section
    is actually near the viewport, instead of the first card
    autoplaying the instant the page loads off-screen.
*/

const testimonialsInViewObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    testimonialsInView = true;

                    syncCarouselVideos();

                    testimonialsInViewObserver.disconnect();

                }

            });

        },
        {
            rootMargin: "600px 0px"
        }
    );

testimonialsInViewObserver.observe(
    testimonialTrack.closest(".testimonials-section") ||
    testimonialTrack
);


updateCarousel();
}


/* = 
SECTION TRANSITION FADE 
= */

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


/* = 
MOBILE PLANS CAROUSEL 
= */

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


/* = 
SHRINKING STICKY HEADER 
= */

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


/* = 
TESTIMONIAL VIDEO SOUND 
= */

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

        /*
            Toggling .muted while a video is actively decoding
            and playing is what tends to trigger the iOS audio
            route hitch. Pausing first, flipping the flag, then
            replaying is a cleaner handoff.
        */

        video.pause();

        video.muted =
            !video.muted;

        video
            .play()
            .catch(() => {});


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


/* = 
RESOURCES CAROUSEL 
= */

const resourceTrack = 
document.querySelector( 
".resource-carousel-track" 
);

const resourceIndicators =
document.querySelector(
".resource-carousel-indicators"
);


/*
    Build the slides + dots from resourcesData
    (defined in resources-data.js, loaded before this file).
    This is the only part that changes when a new resource
    is added to resourcesData — everything below still just
    queries the DOM like before, so the carousel logic itself
    never has to be touched.
*/

if (
    resourceTrack &&
    typeof resourcesData !== "undefined" &&
    resourcesData.length > 0
) {

    resourceTrack.innerHTML = resourcesData.map(
        (resource) => `
            <article class="resource-slide">

                <div class="resource-cover">
                    <img src="${resource.image}" alt="${resource.titleMain} ${resource.titleSpan}">
                </div>

                <div class="resource-content">

                    <div class="resource-category">
                        ${resource.category}
                    </div>

                    <h2>
                        ${resource.titleMain}
                        <span>${resource.titleSpan}</span>
                    </h2>

                    <p>
                        ${resource.description}
                    </p>

                    <a
                        href="${resource.pdf}"
                        class="resource-button"
                        target="_blank"
                        download>

                        <i class="fa-solid fa-download"></i>

                        Descargar recurso

                    </a>

                </div>

            </article>
        `
    ).join("");


    if (resourceIndicators) {

        resourceIndicators.innerHTML = resourcesData.map(
            (_, index) =>
                `<span class="resource-dot${index === 0 ? " active" : ""}"></span>`
        ).join("");

    }

}


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


/* =========================
   TOUCH SWIPE
   (registered once, using the real
   resource-carousel elements)
========================= */

let resourceTouchStartX = 0;
let resourceTouchEndX = 0;


resourceTrack.addEventListener(
    "touchstart",
    (event) => {

        resourceTouchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


resourceTrack.addEventListener(
    "touchend",
    (event) => {

        resourceTouchEndX =
            event.changedTouches[0].screenX;


        if (
            resourceTouchEndX <
            resourceTouchStartX - 50
        ) {

            resourceNext.click();

        }


        if (
            resourceTouchEndX >
            resourceTouchStartX + 50
        ) {

            resourcePrev.click();

        }

    },
    { passive: true }
);


updateResourceCarousel();
}

