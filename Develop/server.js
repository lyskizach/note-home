const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const { readFromFile, writeToFile, readAndAppend } = require('./public/assets/js/help');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);
app.get('/api/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './db/db.json'))
);

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if(req.body) {
        const newNote = {
            "title": title,
            "text": text,
            "uuid": crypto.randomUUID()
        };
        readAndAppend(newNote, './db/db.json');

    } else {
        res.error('Error adding a new note');
    }
});

// ADD APP.DELETE

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);