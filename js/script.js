const profile = document.querySelector(".right img");
const text = document.querySelector(".left");

let ticking = false;

function updateAnimations() {
    const scroll = window.scrollY;

    profile.style.opacity = Math.max(0, 1 - scroll / 350);

    const move = Math.min(scroll * 0.4, 180);
    text.style.transform = `translateY(-${move}px)`;

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});