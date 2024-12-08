const express = require('express');
const db = require('./database/db.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint notes
app.get('/api/notes/search', (req, res) => {
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

app.post('/api/notes', (req, res) => {
  const { title, note } = req.body;
  const datetime = new Date();
  db.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating note', error: err });
    }
    res.status(201).json({ id: results.insertId, title, note, datetime });
  });
});

app.put('/api/notes/:id', (req, res) => {
  const { title, note, datetime } = req.body;
  if (!title || !note) {
    return res.status(400).json({ message: 'Judul dan catatan tidak boleh kosong!' });
  }
  db.query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating note', error: err });
    }
    res.status(200).json({ message: 'Note updated successfully' });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  db.query('DELETE FROM notes WHERE id = ?', [req.params.id], (err) => {
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
