import React, { useState, useEffect } from "react";
import "./App.css";
import NoteCard from "./components/NoteCard";
import EditNote from "./EditNote"; // Import EditNote

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", note: "" });
  const [editNote, setEditNote] = useState(null); // Menyimpan data catatan yang sedang diedit

  // Fetch catatan dari server
  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  // Fungsi untuk membuat catatan baru
  const handleCreateNote = () => {
    fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => setNotes([...notes, data]));

    setNewNote({ title: "", note: "" });
  };

  // Fungsi untuk menyimpan perubahan catatan
  const handleSaveEdit = () => {
    if (!editNote) return;

    fetch(`http://localhost:5000/api/notes/${editNote.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editNote),
    })
      .then((response) => response.json())
      .then((updatedNote) => {
        // Perbarui catatan di state
        setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
        setEditNote(null); // Tutup modal setelah menyimpan
      });
  };

  return (
    <div className="App">
      {/* Header */}
      <header>
        <h1>Notes</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Cari catatan ..."
        />
      </header>

      {/* Form untuk membuat catatan */}
      <div className="form-container">
        <h2>Buat catatan</h2>
        <p className="char-limit">Sisa karakter: {50 - newNote.title.length}</p>
        <input
          type="text"
          className="note-input"
          placeholder="Ini adalah judul ..."
          value={newNote.title}
          maxLength={50}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          className="note-textarea"
          placeholder="Tuliskan catatanmu di sini ..."
          value={newNote.note}
          maxLength={500}
          onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
        />
        <button className="create-btn" onClick={handleCreateNote}>
          Buat
        </button>
      </div>

      {/* List catatan */}
      <div className="note-section">
        <h2>Catatan Aktif</h2>
        <div className="note-container">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => setEditNote(note)} // Buka modal edit
            />
          ))}
        </div>
      </div>

      {/* Gunakan EditNote untuk modal */}
      {editNote && (
        <EditNote
          editNote={editNote}
          setEditNote={setEditNote}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
