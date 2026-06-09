import { useNavigate } from "react-router-dom";
import folder from "../../../assets/folder.png";

export const Folder = ({ name, idFolder, handleDeleteFolder }) => {
  const navigate = useNavigate();

  const enterInPage = (id) => {
    navigate(`/folder/${id}`, { replace: true });
  };

  return (
    <div className="hover:bg-fondo rounded-xl duration-300">
      <div className="cursor-pointer" onClick={() => enterInPage(idFolder)}>
        <img src={folder} />
        <h1 className="text-center -mt-5">{name}</h1>
      </div>
      <div className="flex justify-center gap-2 p-2">
        <button
          className="bg-cafef text-white text-sm font-bold px-4 py-2 w-full rounded cursor-pointer hover:bg-cafec"
          onClick={() => handleDeleteFolder(idFolder)}
        >
          Eliminar
        </button>
        <button
          className="bg-azulf text-white text-sm font-bold px-4 py-2 w-full rounded cursor-pointer hover:bg-azulc"
          onClick={() => handleDeleteFolder(idFolder)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};
