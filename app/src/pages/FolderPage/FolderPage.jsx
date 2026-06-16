import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { NoteCard } from "./components/NoteCard";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { ChevronsLeft } from "lucide-react";
import { ButtonFloat } from "../../components/ButtonFloat";
import { api } from "../../services/api";

export const FolderPage = () => {
  const { idFolder } = useParams();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const getUser = () => JSON.parse(localStorage.getItem("userData"));
  const user = getUser();
  const fetchNotes = async () => {
    try {
      const data = await api.getNotesByFolder(idFolder);
      setNotes(data);
    } catch (err) {
      console.error("Error al traer las notas:", err);
    }
  };

  const deleteNote = async (idNote) => {
    try {
      const data = await api.deleteNote(idNote);
      toast.success(data.message);
      fetchNotes();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreateNote = async () => {
    if (noteTitle.trim() == "") {
      toast.error("Ingresa un título");
      return;
    }
    try {
      const data = await api.createNote({ title: noteTitle, content: `# ${noteTitle}`, idFolder: idFolder });
      toast.success(data.message);
      setShowModal(false);
      setNoteTitle("");
      fetchNotes();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, [idFolder]);

  return (
    <>
      <Header
        left={
          <button
            onClick={() => navigate("/home", { replace: true })}
            className="flex gap-2 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded px-5 py-2 text-white mb-3 mt-3 cursor-pointer hover:bg-cafec"
          >
            <ChevronsLeft /> Regresar
          </button>
        }
      />
      <Modal
        titleModal="Nueva nota"
        textButton="Crear"
        placeholder="Título de la nota"
        visible={showModal}
        onClose={() => { setShowModal(false); setNoteTitle(""); }}
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        onClick={handleCreateNote}
      />
      <div className="p-5">
        {notes.length === 0 ? (
          <p className="text-center text-azulf text-2xl font-bold font-[Open_Sans] mt-10">
            No hay notas en esta carpeta
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.idNote}
                idNote={note.idNote}
                idFolder={idFolder}
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                deleteNote={() => deleteNote(note.idNote)}
              />
            ))}
          </div>
        )}
      </div>
      <ButtonFloat handleClick={() => setShowModal(true)} />
    </>
  );
};
