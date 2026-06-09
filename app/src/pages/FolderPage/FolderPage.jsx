import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoteCard } from "./components/NoteCard";
import { Header } from "../../components/Header";
import { ChevronsLeft } from "lucide-react";

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
      <div className="pt-20 pl-5 bg-fondo">
        <button onClick={() => navigate("/home", { replace: true })} 
          className="flex gap-2 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded px-5 py-2 text-white mb-3 mt-3  cursor-pointer hover:bg-cafec"
          > <ChevronsLeft /> Regresar
        </button>
        {notes.length === 0 ? (
          <p className="text-center text-azulf text-2xl font-bold font-[Open_Sans]"
          > No hay notas en esta carpeta o están cargando...</p>
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
