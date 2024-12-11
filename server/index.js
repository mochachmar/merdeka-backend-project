const express = require('express');
const db = require('./database/db.js');
const cors = require('cors');
require('dotenv').config();

const noteController = require('./controllers/noteController');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint notes
app.get('/api/notes', noteController.getNotes, (req, res) => {
  db.query('SELECT * FROM notes ORDER BY datetime DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error fetching notes', error: err });
    }
    res.json({ success: true, data: results });
  });
});

app.get('/api/notes/search', noteController.searchNotes, (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  db.query('SELECT * FROM notes WHERE title LIKE ? OR note LIKE ? ORDER BY datetime DESC', [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error searching notes', error: err });
    }
    res.json(results);
  });
});

app.post('/api/notes', noteController.createNote, (req, res) => {
  const { title, note } = req.body;
  const datetime = new Date();
  db.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating note', error: err });
    }
    res.status(201).json({ id: results.insertId, title, note, datetime });
  });
});

app.put('/api/notes/:id', noteController.updateNote, (req, res) => {
  const { title, note, datetime } = req.body;
  if (!title || !note) {
    return res.status(400).json({ message: 'Judul dan catatan tidak boleh kosong!' });
  }
  db.query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating note', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }
    res.status(200).json({ message: 'Note updated successfully' });
  });
});

app.delete('/api/notes/:id', noteController.deleteNote, (req, res) => {
  const noteId = req.params.id;
  const query = 'DELETE FROM notes WHERE id = ?';

  db.query(query, [noteId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }
    res.status(200).json({ message: 'Catatan berhasil dihapus' });
  });
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
