import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { RoutesContext } from "../../context/RoutesContext";

export const NotePage = () => {
  const { idNote } = useParams();
  const { folderPage } = useContext(RoutesContext);
  const navigate = useNavigate();

  return (
    <>
      <Header
        left={
          <>
            <button
              onClick={() =>
                navigate("/folder/" + folderPage, { replace: true })
              }
            >
              Regresar
            </button>
          </>
        }
      />
    </>
  );
};
