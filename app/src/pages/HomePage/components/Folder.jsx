import { useNavigate } from "react-router-dom";
import folder from "../../../assets/folder.png";

export const Folder = ({ name, idFolder }) => {
  const navigate = useNavigate();

  const enterInPage = (id) => {
    navigate(`/folder/${id}`, { replace: true });
  };

  return (
    <div onClick={() => enterInPage(idFolder)}>
      <img src={folder} />
      <h1>{name}</h1>
    </div>
  );
};
