const profile = document.querySelector(".right img");
const text = document.querySelector(".left");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    // Fade profile
    profile.style.opacity = Math.max(0, 1 - scroll / 350);

    // Move text up, but no more than 180px
    const move = Math.min(scroll * 0.4, 180);

    text.style.transform = `translateY(-${move}px)`;

});