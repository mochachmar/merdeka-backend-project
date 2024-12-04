const express = require('express');
const db = require('./database/db.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint untuk mendapatkan semua notes
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM notes ORDER BY datetime DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching notes', error: err });
    }
    res.json(results);
  });
});

// Endpoint untuk menambahkan note
app.post('/api/notes', (req, res) => {
  const { title, note } = req.body;
  const datetime = new Date();
  const query = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  db.query(query, [title, datetime, note], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating note', error: err });
    }
    res.status(201).json({ id: results.insertId, title, note, datetime });
  });
});

// Endpoint untuk mengupdate note
app.put('/api/notes/:id', (req, res) => {
  const { title, note } = req.body;
  const datetime = new Date();
  const query = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
  db.query(query, [title, datetime, note, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating note', error: err });
    }
    res.status(200).json({ message: 'Note updated successfully' });
  });
});

// Endpoint untuk menghapus note
app.delete('/api/notes/:id', (req, res) => {
  const query = 'DELETE FROM notes WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting note', error: err });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  });
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
