# Notes App by Sahabat Tani Group

A simple React-based note-taking application that allows users to create, edit, and search for notes. The app interacts with a RESTful API to store and retrieve notes.

## Features

- Create a new note with a title and content.
- Edit an existing note.
- Search notes by title or content.
- Character limits for title and content to ensure concise notes.

## Technologies Used

- **Frontend:** React, CSS
- **Backend:** RESTful API (assumed to be running at `http://localhost:5000/api/notes`)

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
   ```

2. Install dependencies:

   ```bash
   npm install -> client
   npm install -> server
   ```

3. Start the React app:

   ```bash
   npm start -> client
   node index.js -> server
   ```

4. Make sure the backend server is running at `http://localhost:5000`.

---

## API Endpoints

Ensure your backend server supports the following API endpoints:

1. **Get all notes**

   - URL: `GET /api/notes`
   - Response: Returns an array of note objects.

   ```json
   [
     {
       "id": 1,
       "title": "Sample Note",
       "note": "This is a sample note."
     }
   ]
   ```

2. **Create a new note**

   - URL: `POST /api/notes`
   - Body: JSON object with `title` and `note`.

   ```json
   {
     "title": "New Note",
     "note": "Note content here."
   }
   ```

   - Response: Created note object.

3. **Update a note**

   - URL: `PUT /api/notes/:id`
   - Body: JSON object with updated `title` and/or `note`.
   - Response: Updated note object.

4. **Search notes**
   - URL: `GET /api/notes/search?query=<search-query>`
   - Response: Array of note objects matching the search query.

---

## Usage

1. **Create a Note**

   - Enter a title and content in the form at the top.
   - Click the "Buat" button to save the note.

2. **Search Notes**

   - Enter a search term in the search input field at the top.
   - The displayed notes will update based on the query.

3. **Edit a Note**
   - Click the edit button on a note card.
   - Update the note details in the edit modal.
   - Click "Save" to apply changes.

---
