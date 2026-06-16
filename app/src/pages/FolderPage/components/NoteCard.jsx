import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Trash2 } from "lucide-react";
import { RoutesContext } from "../../../context/RoutesContext";

export const NoteCard = ({
  idNote,
  idFolder,
  title,
  content,
  deleteNote,
}) => {
  const navigate = useNavigate();
  const { setFolderPage } = useContext(RoutesContext);

  const handleClickNote = (idNote) => {
    setFolderPage(idFolder);
    navigate("/note/" + idNote, { replace: true });
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm min-h-[220px] flex flex-col group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button
          className="bg-cafef text-white p-1.5 rounded cursor-pointer hover:bg-cafec"
          onClick={(e) => {
            e.stopPropagation();
            deleteNote(idNote);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div
        onClick={() => handleClickNote(idNote)}
        className="flex flex-col flex-1 p-4 cursor-pointer"
      >
        <h3 className="font-bold text-gray-800 mb-2 pb-2 border-b border-gray-100">
          {title}
        </h3>
        <div className="text-gray-600 text-sm break-words line-clamp-10 flex-1 prose prose-sm max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </div>
    </div>
  );
};
