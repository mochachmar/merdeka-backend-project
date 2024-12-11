import React from 'react';

function NoteCard({ note, onDelete, onEdit }) {
  const formattedDate = new Date(note.datetime).toLocaleString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <small>{formattedDate}</small>
      <p>{note.note}</p>
      <div className="actions">
        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          Hapus
        </button>
        <button className="edit-btn" onClick={onEdit}>
          Ubah
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
