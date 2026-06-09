import { useNavigate } from "react-router-dom";
import folder from "../../../assets/folder.png";

export const Folder = ({ name, idFolder, handleDeleteFolder }) => {
  const navigate = useNavigate();

  const enterInPage = (id) => {
    navigate(`/folder/${id}`, { replace: true });
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => enterInPage(idFolder)}>
        <img src={folder} />
        <h1 className="font-bold text-center">{name}</h1>
      </div>
      <button onClick={() => handleDeleteFolder(idFolder)}>Eliminar</button>
    </>
  );
};
