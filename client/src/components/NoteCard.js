import React from 'react';

function NoteCard({ note }) {
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/notes/${note.id}`, {
      method: 'DELETE',
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.note}</p>
      <div className="button-group">
        <button className="archive-btn">Archive</button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
