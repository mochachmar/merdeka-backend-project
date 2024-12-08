const db = require('../db'); // Import koneksi database

// Arsipkan catatan dengan memindahkannya ke tabel 'notes_archive'
exports.archiveNote = async (req, res) => {
    try {
        const { id } = req.params; // ID catatan yang ingin diarsipkan

        // Ambil catatan berdasarkan ID dari tabel 'notes'
        const [note] = await db.query('SELECT * FROM notes WHERE id = ?', [id]);

        if (note.length === 0) {
            return res.status(404).json({ success: false, message: 'Catatan tidak ditemukan' });
        }

        // Masukkan catatan ke tabel 'notes_archive'
        const { title, datetime, note: body } = note[0]; // Kolom 'note' adalah isi catatan
        await db.query(
            'INSERT INTO notes_archive (note_id, title, datetime, note) VALUES (?, ?, ?, ?)', 
            [id, title, datetime, body]
        );

        // Hapus catatan dari tabel 'notes'
        await db.query('DELETE FROM notes WHERE id = ?', [id]);

        res.status(200).json({ success: true, message: 'Catatan berhasil diarsipkan' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Tampilkan semua catatan yang diarsipkan
exports.getArchives = async (req, res) => {
    try {
        const [archives] = await db.query('SELECT * FROM notes_archive');
        res.status(200).json({ success: true, data: archives });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Kembalikan catatan dari arsip ke tabel 'notes'
exports.restoreNote = async (req, res) => {
    try {
        const { id } = req.params; // ID catatan yang ingin dikembalikan

        // Ambil catatan dari tabel 'notes_archive'
        const [archive] = await db.query('SELECT * FROM notes_archive WHERE note_id = ?', [id]);

        if (archive.length === 0) {
            return res.status(404).json({ success: false, message: 'Arsip tidak ditemukan' });
        }

        // Masukkan kembali catatan ke tabel 'notes'
        const { title, datetime, note: body } = archive[0];
        await db.query(
            'INSERT INTO notes (id, title, note, datetime) VALUES (?, ?, ?, ?)', 
            [id, title, body, datetime]
        );

        // Hapus catatan dari tabel 'notes_archive'
        await db.query('DELETE FROM notes_archive WHERE note_id = ?', [id]);

        res.status(200).json({ success: true, message: 'Catatan berhasil dikembalikan' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
