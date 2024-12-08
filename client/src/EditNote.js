import React from "react";

function EditNote({ editNote, setEditNote, handleSaveEdit }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Catatan</h2>
        <label htmlFor="note-title">Judul Catatan</label>
        <input
          id="note-title"
          type="text"
          className="note-input"
          value={editNote.title}
          maxLength={50}
          onChange={(e) =>
            setEditNote({ ...editNote, title: e.target.value })
          }
        />
        <label htmlFor="note-textarea">Isi Catatan</label>
        <textarea
          id="note-textarea"
          className="note-textarea"
          value={editNote.note}
          maxLength={500}
          onChange={(e) =>
            setEditNote({ ...editNote, note: e.target.value })
          }
        />
        <label htmlFor="note-date">Tanggal </label>
        <input
          id="note-date"
          type="date"
          className="note-date"
          value={editNote.date}
          onChange={(e) =>
            setEditNote({ ...editNote, date: e.target.value })
          }
        />
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSaveEdit}>
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
