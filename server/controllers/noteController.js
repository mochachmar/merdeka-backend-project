const db = require('../database/db.js');

// Membuat note baru
exports.createNote = async (req, res) => {
  try {
    const { title, note } = req.body;

    // Validasi: Pastikan title dan note tidak kosong
    if (!title || !note) {
      return res.status(400).json({
        success: false,
        message: 'Title and note are required and cannot be empty.',
      });
    }

    const datetime = new Date(); // Gunakan tanggal sekarang
    const [result] = await db.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note]);

    res.status(201).json({
      success: true,
      data: { id: result.insertId, title, datetime, note },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mendapatkan semua note
exports.getNotes = async (req, res) => {
  try {
    const [notes] = await db.query('SELECT * FROM notes ORDER BY datetime DESC');
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mendapatkan note berdasarkan ID
exports.searchNotes = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter is required' });
    }

    const [results] = await db.query('SELECT * FROM notes WHERE title LIKE ? OR note LIKE ? ORDER BY datetime DESC', [`%${query}%`, `%${query}%`]);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error searching notes', error: error.message });
  }
};

// Memperbarui note
exports.updateNote = async (req, res) => {
  try {
    const { title, note } = req.body;
    const datetime = new Date();
    const [result] = await db.query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    if (!title || !note) {
      return res.status(400).json({
        success: false,
        message: 'Title and note are required and cannot be empty.',
      });
    }

    res.status(200).json({ success: true, message: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menghapus note
exports.deleteNote = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
