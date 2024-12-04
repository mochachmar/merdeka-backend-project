import React, { useState, useEffect } from 'react';
import './App.css';
import NoteCard from './components/NoteCard';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', note: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const handleCreateNote = () => {
    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => setNotes([...notes, data]));

    setNewNote({ title: '', note: '' });
  };

  return (
    <div className="App">
      <header>
        <h1>Notes</h1>
        <input type="text" placeholder="Search notes" onChange={(e) => {}} />
      </header>

      <section>
        <h2>Create Note</h2>
        <input type="text" placeholder="Enter note title" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
        <textarea placeholder="Enter note content" value={newNote.note} onChange={(e) => setNewNote({ ...newNote, note: e.target.value })} />
        <button onClick={handleCreateNote}>Create Note</button>
      </section>

      <section>
        <h2>Active Notes</h2>
        <div>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
