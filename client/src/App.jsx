import React, { useState, useEffect } from 'react';
import './App.css';
import NoteCard from './components/NoteCard';
import EditNote from './EditNote';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]); // State untuk menyimpan hasil filter
  const [newNote, setNewNote] = useState({ title: '', note: '' });
  const [editNote, setEditNote] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.data); // Pastikan mengambil `data` dari respons API
        setFilteredNotes(data.data);
      });
  }, []);

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.note.trim()) {
      setErrorMessage('Judul dan catatan tidak boleh kosong!');
      return;
    }
    setErrorMessage('');
    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes([...notes, data]);
        setFilteredNotes([...notes, data]); // Tambahkan catatan baru ke hasil filter
        setNewNote({ title: '', note: '' });
      });
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Menghapus catatan dari state setelah berhasil dihapus di server
            setNotes(notes.filter((note) => note.id !== noteId));
            setFilteredNotes(filteredNotes.filter((note) => note.id !== noteId));
          } else {
            throw new Error('Gagal menghapus catatan');
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const handleSaveEdit = () => {
    if (!editNote) return;

    fetch(`http://localhost:5000/api/notes/${editNote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editNote),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Note updated successfully') {
          setNotes((prevNotes) => prevNotes.map((note) => (note.id === editNote.id ? { ...note, ...editNote } : note)));

          setFilteredNotes((prevNotes) => prevNotes.map((note) => (note.id === editNote.id ? { ...note, ...editNote } : note)));
          setEditNote(null);
        } else {
          setErrorMessage(data.message || 'Gagal memperbarui catatan');
        }
      })
      .catch((error) => {
        setErrorMessage('Terjadi kesalahan saat memperbarui catatan');
      });
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = notes.filter((note) => note.title.toLowerCase().includes(query) || note.note.toLowerCase().includes(query));
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes); // Reset hasil filter jika input kosong
    }
  };

  return (
    <div className="App">
      <header>
        <h1>
          NotesKu <br /> Created by Sahabat Tani Group
        </h1>
        <input
          type="text"
          className="search-input"
          placeholder="Cari catatan ..."
          value={searchQuery}
          onChange={handleSearch} // Perbarui hasil pencarian secara real-time
        />
      </header>

      <div className="form-container">
        <h2>Buat catatan</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="char-limit">Sisa karakter: {50 - newNote.title.length}</p>
        <input type="text" className="note-input" placeholder="Ini adalah judul ..." value={newNote.title} maxLength={50} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
        <textarea className="note-textarea" placeholder="Tuliskan catatanmu di sini ..." value={newNote.note} maxLength={500} onChange={(e) => setNewNote({ ...newNote, note: e.target.value })} />
        <button className="create-btn" onClick={handleCreateNote}>
          Buat
        </button>
      </div>

      <div className="note-section">
        <h2>Catatan</h2>
        <div className="note-container">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onEdit={() => setEditNote(note)} />
          ))}
        </div>
      </div>

      {editNote && <EditNote editNote={editNote} setEditNote={setEditNote} handleSaveEdit={handleSaveEdit} />}
    </div>
  );
}

export default App;
