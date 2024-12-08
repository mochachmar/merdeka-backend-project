import React from 'react';

function NoteCard({ note, onEdit, onArchive }) {
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/notes/${note.id}`, {
      method: 'DELETE',
    }).then(() => {
      window.location.reload();
    });
  };

  // Format datetime
  const formattedDate = new Date(note.datetime).toLocaleString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <small>{formattedDate}</small>
      <p>{note.note}</p>
      <div className="actions">
        <button className="delete-btn" onClick={handleDelete}>
          Hapus
        </button>
        <button className="edit-btn" onClick={onEdit}>
          Ubah
        </button>
        <button className="archive-btn" onClick={onArchive}>
          Arsipkan
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
