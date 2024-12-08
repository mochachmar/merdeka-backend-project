# Notes App by Sahabat Tani Group

A simple React-based note-taking application that allows users to create, edit, search, and delete notes. The app interacts with a RESTful API to store and retrieve notes.

## Features

- Create a new note with a title, date, and content.
- View all notes.
- Search for specific notes by title or content.
- Edit an existing note (title, date, and content).
- Delete notes.
- Character limits for title and content to ensure concise notes.

## Technologies Used

- **Frontend:** React, CSS
- **Backend:** RESTful API (assumed to be running at `http://localhost:5000/api/notes`)
- **Database:** MySQL

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/mochachmar/merdeka-backend-project.git
   cd merdeka-backend-project
   ```

2. Setup Database (MySQL):

   ```sql
   CREATE DATABASE notes_db;
   USE notes_db;

   CREATE TABLE notes (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       title TEXT NOT NULL,
       datetime DATETIME NOT NULL,
       note LONGTEXT NOT NULL
   );
   ```

3. Install dependencies for both the client and server:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Start the application:

   - **Frontend:**

     ```bash
     cd client
     npm start
     ```

   - **Backend:**
     ```bash
     cd server
     node index.js
     ```

5. Make sure the backend server is running at `http://localhost:5000`.

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
       "datetime": "2024-12-01T14:00:00Z",
       "note": "This is a sample note."
     }
   ]
   ```

2. **Create a new note**

   - URL: `POST /api/notes`
   - Body: JSON object with `title`, `datetime`, and `note`.

   ```json
   {
     "title": "New Note",
     "datetime": "2024-12-08T10:00:00Z",
     "note": "Note content here."
   }
   ```

   - Response: Created note object.

3. **Get a single note**

   - URL: `GET /api/notes/:id`
   - Response: A single note object.

   ```json
   {
     "id": 1,
     "title": "Sample Note",
     "datetime": "2024-12-01T14:00:00Z",
     "note": "This is a sample note."
   }
   ```

4. **Search notes**

   - URL: `GET /api/notes/search?query=<search-query>`
   - Response: Array of note objects matching the search query.

   ```json
   [
     {
       "id": 1,
       "title": "Sample Note",
       "datetime": "2024-12-01T14:00:00Z",
       "note": "This is a sample note."
     }
   ]
   ```

5. **Update a note**

   - URL: `PUT /api/notes/:id`
   - Body: JSON object with updated `title`, `datetime`, and/or `note`.

   ```json
   {
     "title": "Updated Note",
     "datetime": "2024-12-08T12:00:00Z",
     "note": "Updated note content."
   }
   ```

   - Response: Updated note object.

6. **Delete a note**
   - URL: `DELETE /api/notes/:id`
   - Response: Success message.
   ```json
   {
     "message": "Note deleted successfully."
   }
   ```

---

## Usage

1. **Create a Note**

   - Enter a title, date, and content in the form at the top.
   - Click the "Buat" button to save the note.

2. **View All Notes**

   - All notes will be displayed in the main section of the app.

3. **Search Notes**

   - Enter a search term in the search input field at the top.
   - The displayed notes will update based on the query.

4. **Edit a Note**

   - Click the edit button on a note card.
   - Update the note details (title, date, and content) in the edit modal.
   - Click "Save" to apply changes.

5. **Delete a Note**
   - Click the delete button on a note card.
   - Confirm the deletion in the prompt.

---
