import { ChevronsLeft, Crown, LogOut, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { api } from "../../services/api.js";
import { usePageUser } from "./hooks/useUserPage.js";
import toast from "react-hot-toast";

export const UserPage = () => {
  const {
    userData,
    setUserDataUpdate,
    userDataUpdate,
    handleCloseSession,
    handleClickPremium,
    fetchUserData,
  } = usePageUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDataUpdate({ ...userDataUpdate, [e.target.id]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const data = await api.updateUser({
        idUser: userData.idUser,
        ...userDataUpdate,
      });
      toast.success(data.message);
      fetchUserData();
    } catch (err) {
      toast.error(err.message);
    }
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
            className="flex gap-2 bg-azulc duration-300 font-bold font-[Open_Sans] text-xl rounded-xl px-5 py-2 text-azulf mb-3 mt-3 cursor-pointer hover:bg-white"
          >
            <LogOut /> Cerrar sesion
          </button>
        }
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col h-100 gap-2 items-center mt-15 bg-fondo"
      >
        <label className="py-2 px-1 font-bold font-[Open_Sans] text-xl text-cafef">
          Username:
        </label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          defaultValue={userData.username}
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
        />
        <label className="py-2 px-1 font-bold font-[Open_Sans] text-xl text-cafef">
          Email:
        </label>
        <input
          id="email"
          type="text"
          onChange={handleChange}
          defaultValue={userData.email}
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
        />
        <label className="py-2 px-1  font-bold font-[Open_Sans] text-xl text-cafef">
          Password:
        </label>
        <input
          id="password"
          type="text"
          onChange={handleChange}
          defaultValue={userData.password}
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
        />
        <div>
          <button
            onClick={() => handleUpdate()}
            className="flex bg-green-700 duration-300 font-bold font-[Open_Sans] text-xl rounded-xl px-5 py-2 text-white mb-3 mt-3 cursor-pointer hover:bg-cafef"
          >
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
