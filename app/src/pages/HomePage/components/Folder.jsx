import { useNavigate } from "react-router-dom";
import { useState } from "react";
import folder from "../../../assets/folder.png";

export const Folder = ({ name, idFolder, handleDeleteFolder }) => {
  const [select, setSelect] = useState(false);
  const navigate = useNavigate();

  const enterInPage = (id) => {
    navigate(`/folder/${id}`, { replace: true });
  };

  return (
    <div
      className={
        !select
          ? `border-1 border-white`
          : `border-1 border-blue-200 rounded-xl bg-blue-100`
      }
      onClick={() => setSelect(!select)}
      onDoubleClick={() => enterInPage(idFolder)}
    >
      <img src={folder} />
      <h1 className="font-bold text-center">{name}</h1>
      <button onClick={() => handleDeleteFolder(idFolder)}>Eliminar</button>
    </div>
  );
};
