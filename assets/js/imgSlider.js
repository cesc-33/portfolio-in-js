'use strict';

const imgFileNames = [
    'default.png',
    'twinkle.png'
];
let slideIndex = 0;

const imgSlider = {
    // Funktion zur Erstellung der Bildergalerie
    createGallery() {
        imgFileNames.forEach((fileName, i) => {
            const elImg = document.createElement('img');
            elImg.src = `/assets/images/${fileName}`;
            elImg.classList.add('slideImg');
            if (i === 0) {
                elImg.classList.add('active');
            }
            document.querySelector('#aboutMeSection').prepend(elImg);
        });
        setInterval(() => {
            this.showSlides();
        }, 2000);
    },

    // Funktion zur Anzeige der aktuellen Bilder
    showSlides() {
        slideIndex ++;
        const slides = document.querySelectorAll('.slideImg');
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        slides.forEach(slide => slide.classList.remove('active'));
        slides[slideIndex].classList.add('active');
    },
};

export default imgSlider;
