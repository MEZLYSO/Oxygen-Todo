import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import folder from "../../../assets/folder.png";

export const Folder = ({ name, idFolder, handleDeleteFolder, handleOpenEdit }) => {
  const navigate = useNavigate();

  const enterInPage = (id) => {
    navigate(`/folder/${id}`, { replace: true });
  };

  return (
    <div className="relative hover:bg-fondo rounded-xl duration-300 group">
      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="bg-cafef text-white p-1.5 rounded cursor-pointer hover:bg-cafec"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFolder(idFolder);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          className="bg-azulf text-white p-1.5 rounded cursor-pointer hover:bg-azulc"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenEdit(idFolder, name);
          }}
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
      <div className="cursor-pointer" onClick={() => enterInPage(idFolder)}>
        <img src={folder} />
        <h1 className="text-center ">{name}</h1>
      </div>
    </div>
  );
};
