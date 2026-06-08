import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const FolderPage = () => {
  const { idFolder } = useParams();
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/note/${idFolder}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await resp.json();
      setNotes(data);
    } catch (err) {
      console.error("Error al traer las notas:", err);
    }
  };

  const deleteNote = async (idNote) => {
    try {
      const resp = await fetch(`http://localhost:8080/note/${idNote}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
      console.log(resp);
    } catch (err) {
      console.error("Error al traer las notas:", err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, [idFolder]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Carpeta ID: {idFolder}</h2>

      <hr />
      <button onClick={() => navigate("/home", { replace: true })}>
        Regresar
      </button>
      {notes.length === 0 ? (
        <p>No hay notas en esta carpeta o están cargando...</p>
      ) : (
        <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
          {notes.map((note) => (
            <div
              key={note.idNote}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "6px",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{note.title}</h3>
              <p>{note.content}</p>
              <small style={{ color: "gray" }}>Creado: {note.createdAt}</small>
              <button onClick={() => deleteNote(note.idNote)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
