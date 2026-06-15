import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesContext } from "../../../context/RoutesContext";

export const NoteCard = ({
  idNote,
  idFolder,
  title,
  content,
  premium,
  deleteNote,
}) => {
  const navigate = useNavigate();

  const { setFolderPage } = useContext(RoutesContext);

  const handleClickNote = (idNote) => {
    setFolderPage(idFolder);
    navigate("/note/" + idNote, { replace: true });
  };

  return (
    <div
      onClick={() => handleClickNote(idNote)}
      className="bg-white border border-gray-200 p-4 rounded-md shadow-sm min-h-[200px] flex flex-col"
    >
      <h3 className="font-bold text-gray-800 mb-2 pb-2 border-b border-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 text-sm break-words line-clamp-10 flex-1">
        {content}
      </p>
      <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
        <button
          onClick={deleteNote}
          className="bg-cafef text-white text-xs px-3 py-1.5 rounded cursor-pointer hover:bg-cafec"
        >
          Eliminar
        </button>
        {premium == 1 ? (
          <button className="bg-azulf text-white text-xs px-3 py-1.5 rounded cursor-pointer hover:bg-azulc">
            IA
          </button>
        ) : (
          <></>
        )}

        <button className="bg-azulf text-white text-xs px-3 py-1.5 rounded cursor-pointer hover:bg-azulc">
          Editar
        </button>
      </div>
    </div>
  );
};
