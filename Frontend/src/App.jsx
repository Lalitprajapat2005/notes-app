import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [notes, setNotes] = useState([]);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch notes data
  const fetchNotes = () => {
    axios
      .get("https://notes-app-fcsw.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.note);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Create + Update note
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      axios
        .patch(`https://notes-app-fcsw.onrender.com/api/notes/${editingId}`, {
          title,
          description,
        })
        .then((res) => {
          console.log(res.data);

          fetchNotes();

          setEditingId(null);
          setTitle("");
          setDescription("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // CREATE
      axios
        .post("https://notes-app-fcsw.onrender.com/api/notes", {
          title,
          description,
        })
        .then((res) => {
          console.log(res.data);

          fetchNotes();

          setTitle("");
          setDescription("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Delete note api
  function handleDeleteNote(noteId) {
    axios
      .delete("https://notes-app-fcsw.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Edit note api
  function handleEditNote(note) {
    setEditingId(note._id);
    setTitle(note.title);
    setDescription(note.description);
  }

  // Only one time api call
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faNoteSticky} />
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button className="submit" type="submit">
          {editingId ? "Update Note" : "Create Note"}
        </button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <div className="btn">
              <button onClick={() => handleEditNote(note)}>
                Edit
              </button>

              <button onClick={() => handleDeleteNote(note._id)}>
                Delete
              </button>
            </div>

            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;