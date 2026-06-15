import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { usePageUser } from "./hooks/useUserPage.js";

export const UserPage = () => {
  const { userData, handleClickPremium } = usePageUser();

  const navigate = useNavigate();

  const handleCloseSession = () => {
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header
        left={
          <button onClick={() => navigate("/home", { replace: true })}>
            Regresar
          </button>
        }
        center={<p className="text-white text-2xl font-bold">Cuenta</p>}
      />
      {JSON.stringify(userData)}
      <div>
        <button
          onClick={() => handleClickPremium()}
          className="flex gap-2 bg-yellow-600 text-white px-3 py-2 rounded focus:outline-none"
        >
          {userData.premium === 0 ? "Comprar" : "Cancelar"} Premium <Crown />
        </button>
      </div>
      <div>
        <button onClick={() => handleCloseSession()}>Cerrar sesion</button>
      </div>
    </>
  );
};
