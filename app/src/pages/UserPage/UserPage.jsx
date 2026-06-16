import { Crown, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { usePageUser } from "./hooks/useUserPage.js";
import { ChevronsLeft } from "lucide-react";
import { LogOut } from "lucide-react";


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
          <button
            onClick={() => navigate("/home", { replace: true })}
            className="flex gap-2 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded-xl px-5 py-2 text-white mb-3 mt-3 cursor-pointer hover:bg-cafec"
          >
            <ChevronsLeft />
            Regresar
          </button>
        }
        center={
          <p className="text-white text-2xl font-[Open_Sans] font-bold">
            Cuenta
          </p>
        }
        right={
          <button
            onClick={() => handleCloseSession()}
            className="flex gap-2 bg-azulf duration-300 font-bold font-[Open_Sans] text-xl rounded-xl px-5 py-2 text-white mb-3 mt-3 cursor-pointer hover:bg-red-700"
          >
            <LogOut /> Cerrar sesion
          </button>
        }
      />
      <form className="flex flex-col  gap-2 items-center mt-15 bg-fondo">
        <label className="py-2 px-1 font-bold font-[Open_Sans] text-xl text-cafef">
          Username:
        </label>
        <input
          type="text"
          defaultValue={userData.username}
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
        />
        <label className="py-2 px-1 font-bold font-[Open_Sans] text-xl text-cafef">
          Email:
        </label>
        <input
          type="text"
          defaultValue={userData.email}
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
        />
        <label className="py-2 px-1  font-bold font-[Open_Sans] text-xl text-cafef">
          Password:
        </label>
        <input
          type="text"
          defaultValue={userData.password}
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
        />
        <div>
          <button className="flex bg-green-700 duration-300 font-bold font-[Open_Sans] text-xl rounded-xl px-5 py-2 text-white mb-3 mt-3 cursor-pointer hover:bg-cafef">
            Guardar Cambios <Save />
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center">
        <button
          onClick={() => handleClickPremium()}
          className={`flex gap-2 ${userData.premium == 0 ? "bg-yellow-600" : "bg-red-600"} text-white font-[Open_Sans] px-3 py-2 mt-3 rounded-xl focus:outline-none`}
        >
          {userData.premium === 0 ? "Comprar" : "Cancelar"} Premium <Crown />
        </button>
      </div>
    </>
  );
};
