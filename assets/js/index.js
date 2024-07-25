'use strict';

// Importieren der Module für DOM-Manipulation, AJAX, Bilderslider und Diagramme
import dom from "./dom.js";
import ajax from './ajax.js';
import imgSlider from "./imgSlider.js";
import diagram from "./diagram.js";

// Initialisierung zum aufrufen der Funktionen
const init = () => {
    dom.mapping();  // Zuordnung der DOM-Elemente
    ajax.loadJSON('/data/skills.json')  // Laden der Skills-Daten aus einer JSON-Datei und erstellen des Diagramms
    .then(skillsData => {
        diagram.createDiagram(skillsData.skills);
    })
    .catch(err => {
        console.log(err);
    })
    dom.appendEventlisteners(); // Hinzufügen von Event-Listenern
    dom.cards();                // Erstellung der Cards
    dom.createHeaderMenu();     // Erstellung des Header-Menüs
    dom.activateHeaderLink();   // Aktivierung der Header-Links
    dom.interestSlideIn();      // Initialisierung der Interessen-Animationen
    imgSlider.createGallery();  // Erstellung der Bildergalerie
}

// Aufrufen der Initialisierungsfunktion
init();
