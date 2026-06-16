import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronsLeft, Pencil, Save, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Header } from "../../components/Header";
import { RoutesContext } from "../../context/RoutesContext";
import { api } from "../../services/api";

export const NotePage = () => {
  const { idNote } = useParams();
  const localUser = () => JSON.parse(localStorage.getItem("userData"));
  const { premium } = localUser();
  const [noteData, setNoteData] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false);
  const { folderPage } = useContext(RoutesContext);
  const navigate = useNavigate();

  const fetchNote = async () => {
    try {
      const data = await api.getNoteById(idNote);
      setNoteData(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (err) {
      console.error("Error al cargar la nota:", err);
      setNoteData(null);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [idNote]);

  const handleGoBack = () => {
    const folderId = folderPage || noteData?.idFolder;
    if (folderId) {
      navigate("/folder/" + folderId, { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  };

  const handleSave = async () => {
    try {
      const data = await api.updateNote({ idNote, title, content });
      toast.success(data.message);
      setEditing(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setTitle(noteData.title);
    setContent(noteData.content);
    setEditing(false);
  };

  if (!noteData)
    return (
      <div className="text-center text-azulf text-2xl font-bold mt-10">
        Nota no encontrada
      </div>
    );

  return (
    <>
      <Header
        left={
          <button
            onClick={handleGoBack}
            className="flex gap-2 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded px-5 py-2 text-white mb-3 mt-3 cursor-pointer hover:bg-cafec"
          >
            <ChevronsLeft /> Regresar
          </button>
        }
        center={
          editing ? (
            <input
              className="text-center bg-white rounded px-4 py-1 text-lg font-bold font-[Open_Sans] text-azulf outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="font-bold font-[Open_Sans] text-white text-xl truncate max-w-[300px]">
              {title}
            </h1>
          )
        }
        right={
          editing ? (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex gap-1 items-center bg-white text-gray-600 font-bold font-[Open_Sans] rounded px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <X size={18} /> Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex gap-1 items-center bg-cafef duration-300 font-bold font-[Open_Sans] rounded px-4 py-2 text-white cursor-pointer hover:bg-cafec"
              >
                <Save size={18} /> Guardar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex gap-1 items-center bg-azulc duration-300 font-bold font-[Open_Sans] rounded px-4 py-2 text-azulf cursor-pointer hover:bg-white"
            >
              <Pencil size={18} /> Editar
            </button>
          )
        }
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-4 text-sm text-gray-400 font-[Open_Sans]">
          {new Date(noteData.createdAt).toLocaleDateString("es-MX")}
        </div>

        {editing ? (
          <textarea
            className="w-full min-h-[600px] p-6 border border-gray-200 rounded-lg shadow-sm font-mono text-base leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-azulc"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe tu nota en Markdown..."
          />
        ) : (
          <div className="w-full min-h-[600px] p-8 bg-white border border-gray-200 rounded-lg shadow-sm prose prose-sm max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
        )}
        {premium == 1 && (
          <div className="pt-5 flex w-full h-auto justify-center">
            <button className="text-center bg-blue-500 text-white px-2 py-1 rounded-2xl">
              Resumir con IA
            </button>
          </div>
        )}
      </div>
    </>
  );
};
