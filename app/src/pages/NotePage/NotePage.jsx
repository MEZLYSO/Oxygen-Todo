import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { RoutesContext } from "../../context/RoutesContext";
import { api } from "../../services/api";

export const NotePage = () => {
  const { idNote } = useParams();
  const [noteData, setNoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { folderPage } = useContext(RoutesContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const data = await api.getNoteById(idNote);
        setNoteData(data);
      } catch (err) {
        console.error("Error al cargar la nota:", err);
        setNoteData(null);
      } finally {
        setLoading(false);
      }
    };
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

  if (loading) return <div>Cargando...</div>;
  if (!noteData) return <div>Nota no encontrada</div>;

  return (
    <>
      <Header
        left={<button onClick={handleGoBack}>Regresar</button>}
        center={<input className="text-center" defaultValue={noteData.title} />}
        right={<button onClick={handleGoBack}>Guardar cambios</button>}
      />
      <div>
        <input type="text" value={noteData.createdAt} disabled />
        <textarea rows={23} className="w-full">
          {noteData.content}
        </textarea>
      </div>
    </>
  );
};
