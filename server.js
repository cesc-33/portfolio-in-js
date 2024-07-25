'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import nano from 'nano';
import { user, pw } from './credentials.js';

const server = express();
const db = nano(`http://${user}:${pw}@127.0.0.1:5984`).db;
db.use('contact_form'); // Verwendung einer spezifischen Datenbank

// Statische Dateien aus dem Hauptverzeichnis bereitstellen
server.use(express.static('.')); 

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Route zum Speichern der Kontaktdaten
server.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    db.insert({ name, email, message }, (err, body) => {
        if (err) {
            res.status(500).send('Fehler beim speichern der Kontaktdaten');
            return;
        }
        res.send('Kontaktdaten gespeichert!');
    });
});

server.listen(8080, () => console.log('Server läuft auf Port 8080'));


//URL zur Seite http://localhost:8080/