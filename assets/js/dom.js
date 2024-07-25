'use strict';

// Importieren des AJAX-Moduls
import ajax from './ajax.js';

// Objekt für die Zuordnung von DOM-Elementen
const elements = {};
let hasScrolled = false;

const dom = {
    // Zuordnung der DOM-Elemente
    mapping() {
        elements.cards = document.querySelectorAll('.card');
        elements.navEl = document.querySelectorAll('h2');
        elements.nav = document.querySelector('nav');
        elements.submitter = document.querySelector('#contact-form');
    },

    // Hinzufügen von Event-Listenern
    appendEventlisteners() {
        elements.submitter.addEventListener('submit', evt => ajax.saveContactData(evt));
    },

    // Erstellung der Cards
    cards() {
        const cards = elements.cards;
        const styleSheet = document.createElement("style");
        let dynamicStyles = '';

        cards.forEach((card, index) => {
            dynamicStyles += `
            .card:nth-child(${index + 1}) {
                top: ${(index + 1) * 20}px;
                width: calc(90% - ${(index) * 10}px - 80px);
                transform: translate3d(${(index) * 10}px, 0 , 0);
            }
        `;
        });

        styleSheet.innerText = dynamicStyles;
        document.head.appendChild(styleSheet);
    },

    // Erstellung des Header-Menüs
    createHeaderMenu() {
        elements.nav.innerHTML = '';

        elements.cards.forEach(section => {
            if (section.querySelector('h2')) {
                const elLink = document.createElement('a');
                elLink.innerText = section.querySelector('h2').innerText;
                elLink.className = `headerLink ${section.id}`;
                elements.nav.append(elLink);
                elLink.addEventListener('click', () => {
                    hasScrolled = true;
                    window.scrollTo(0, 0);

                    section.scrollIntoView({ behavior: 'smooth' });
                });
            }
        });
    },

    // Aktivierung der Header-Links
    activateHeaderLink() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0.5] 
        };

        const observer = new IntersectionObserver(entries => {
            if (!hasScrolled) return;
                entries.forEach(entry => {
                    const targetId = entry.target.id;
                    const activeLink = document.querySelector(`.headerLink.${targetId}`);

                    if (entry.isIntersecting) {
                        if (entry.target.previousElementSibling) {
                            entry.target.previousElementSibling.classList.remove('active');
                        }
                        entry.target.classList.add('active');
                        if (activeLink) {
                            if (activeLink.previousElementSibling) {
                                activeLink.previousElementSibling.classList.remove('active');
                            }
                            activeLink.classList.add('active');
                        }
                    } else {
                        if (entry.target.previousElementSibling) {
                            entry.target.previousElementSibling.classList.add('active');
                        }
                        entry.target.classList.remove('active');
                        if (activeLink) {
                            activeLink.classList.remove('active');
                            if (activeLink.previousElementSibling) {
                                activeLink.previousElementSibling.classList.add('active');
                            }
                        }
                    }
                });
            }, options);
            elements.cards.forEach(card => observer.observe(card));

            window.addEventListener('scroll', () => {
                hasScrolled = true;
            }, { once: true });
    },

    // Observierung des Elements für die Interessen-Animationen
    interestSlideIn() {
        const imgSrcElements = document.querySelectorAll('.imgSrc');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.9
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('slideOut');
                    entry.target.classList.add('slideIn');
                } else {
                    entry.target.classList.remove('slideIn');
                    entry.target.classList.add('slideOut');
                }
            });
        }, observerOptions);

        imgSrcElements.forEach(element => {
            observer.observe(element);
        });
    },
};

export default dom;
