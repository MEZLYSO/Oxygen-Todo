import { useNavigate } from "react-router-dom";
import folder from "../../../assets/folder.png";

export const Folder = ({ name, idFolder, handleDeleteFolder }) => {
  const navigate = useNavigate();

  const enterInPage = (id) => {
    navigate(`/folder/${id}`, { replace: true });
  };

  return (
    <div className="hover:bg-blue-100 rounded-xl duration-300">
      <div className="cursor-pointer" onClick={() => enterInPage(idFolder)}>
        <img src={folder} />
        <h1 className="text-center -mt-5">{name}</h1>
      </div>
      <div className="flex justify-center gap-2 p-2">
        <button
          className="bg-red-600 text-white text-sm font-bold px-4 py-2 w-full rounded"
          onClick={() => handleDeleteFolder(idFolder)}
        >
          Eliminar
        </button>
        <button
          className="bg-blue-400 text-white text-sm font-bold px-4 py-2 w-full rounded"
          onClick={() => handleDeleteFolder(idFolder)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};
