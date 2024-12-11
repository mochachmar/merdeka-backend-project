import React, { useState } from 'react';

function EditNote({ editNote, setEditNote, handleSaveEdit }) {
  const [errorMessage, setErrorMessage] = useState(''); // Tambahkan state untuk error message

  const validateAndSave = () => {
    if (!editNote.title.trim() || !editNote.note.trim()) {
      setErrorMessage('Judul dan catatan tidak boleh kosong!');
      return;
    }
    setErrorMessage(''); // Reset pesan kesalahan jika validasi berhasil
    handleSaveEdit();
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().slice(0, 19).replace('T', ' ');
    setEditNote({ ...editNote, datetime: formattedDate });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Catatan</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Tampilkan pesan error */}
        <label htmlFor="note-title">Judul Catatan</label>
        <input id="note-title" type="text" className="note-input" value={editNote.title} maxLength={50} onChange={(e) => setEditNote({ ...editNote, title: e.target.value })} />
        <label htmlFor="note-textarea">Isi Catatan</label>
        <textarea id="note-textarea" className="note-textarea" value={editNote.note} maxLength={500} onChange={(e) => setEditNote({ ...editNote, note: e.target.value })} />
        <label htmlFor="note-datetime">Tanggal</label>
        <input id="note-datetime" type="datetime-local" className="note-date" value={formatDateTime(editNote.datetime)} onChange={handleDateChange} />
        <div className="modal-actions">
          <button className="save-btn" onClick={validateAndSave}>
            Simpan
          </button>
          <button className="cancel-btn" onClick={() => setEditNote(null)}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
