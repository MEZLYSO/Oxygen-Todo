import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoteCard } from "./components/NoteCard";
import { Header } from "../../components/Header";

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
    <>
      <Header title={"Notas"} />
      <div className="pt-20">
        <button onClick={() => navigate("/home", { replace: true })}>
          Regresar
        </button>
        {notes.length === 0 ? (
          <p>No hay notas en esta carpeta o están cargando...</p>
        ) : (
          <div className="flex p-5">
            {notes.map((note) => (
              <NoteCard
                key={note.idNote}
                idNote={note.idNote}
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                deleteNote={deleteNote()}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
