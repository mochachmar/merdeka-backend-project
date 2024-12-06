import React, { useState, useEffect } from "react";
import "./App.css";
import NoteCard from "./components/NoteCard";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", note: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

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

  return (
    <div className="App">
      <header>
        <h1>Catatan Saya</h1>
        <input type="text" placeholder="Cari Catatan" onChange={(e) => {}} />
      </header>

      <section>
        <h2>Buat Catatan Baru</h2>
        <input
          type="text"
          placeholder="Masukkan judul catatan"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Masukkan konten catatan"
          value={newNote.note}
          onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
        />
        <div className="create-note-btn-container">
          <button onClick={handleCreateNote}>Buat Catatan</button>
        </div>
      </section>

      <section>
        <h2>Catatan Yang Ada</h2>
        {notes.length === 0 ? (
          <div className="empty-state">
            Tidak ada catatan! Ayo buat catatan pertama mu!
          </div>
        ) : (
          <div className="note-container">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
