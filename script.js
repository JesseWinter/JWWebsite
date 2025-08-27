console.log("Script loaded");
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slideshow img");
    let currentIndex = 0;

    console.log("Found", slides.length, "images in slideshow.");
    slides.forEach((img, idx) => {
        img.addEventListener('error', () => {
            console.error('Image failed to load:', img.src);
        });
        img.addEventListener('load', () => {
            console.log('Image loaded:', img.src);
        });
    });

    function showNextSlide() {
        // Fade out current image
        slides[currentIndex].style.transition = "opacity 1s ease-in-out";
        slides[currentIndex].style.opacity = 0;
        // Move to next image
        currentIndex = (currentIndex + 1) % slides.length;
        // Fade in next image
        slides[currentIndex].style.transition = "opacity 1s ease-in-out";
        slides[currentIndex].style.opacity = 1;
        console.log("Showing slide", currentIndex + 1, "of", slides.length);
    }

    if (slides.length > 0) {
        // Initialize all images to hidden except the first
        slides.forEach((img, idx) => {
            img.style.opacity = (idx === 0) ? 1 : 0;
            img.style.transition = "opacity 1s ease-in-out";
        });
        setInterval(showNextSlide, 3000); // Change slide every 3 seconds
        console.log("Slideshow started.");
    } else {
        console.warn("No images found for slideshow.");
    }
});

document.addEventListener("scroll", function () {
    const maxScrollHeight = 500;

    if (window.scrollY > maxScrollHeight - window.innerHeight) {
        window.scrollTo(0, maxScrollHeight - window.innerHeight);
    }
});