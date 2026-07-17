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