'use strict';

const ajax = {
    // Funktion zum Laden von JSON-Daten
    loadJSON(url) {
        return fetch(url) // Abrufen der Daten mit URL als parameter
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.warn('Fetch error:', error);
                throw error;
            });
    },
    
    // Funktion zum Speichern der Kontaktformulardaten
    saveContactData(evt) {
        evt.preventDefault(); // Verhindern des Standardverhaltens des Formulars (Seiten-Neuladen)

        // Formulardaten erfassen und Datenobjekt erstellen
        const formData = new FormData(evt.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Es gab ein Problem beim Senden des Formulars.');
            });
    }
}

export default ajax;
