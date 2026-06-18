import { ChevronsLeft, Crown, LogOut, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Header } from "../../components/Header.jsx";
import { api } from "../../services/api.js";
import { usePageUser } from "./hooks/useUserPage.js";
import toast from "react-hot-toast";

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "MXN",
  intent: "capture",
};

export const UserPage = () => {
  const {
    userData,
    setUserDataUpdate,
    userDataUpdate,
    handleCloseSession,
    handleBuyPremium,
    handleCancelPremium,
    fetchUserData,
    showPayPal,
    setShowPayPal,
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

  const createOrder = async (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { currency_code: "MXN", value: "70" },
          description: "Premium Oxygen",
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const result = await api.capturePayPalOrder({
      orderId: data.orderID,
      idUser: userData.idUser,
    });
    toast.success(result.message);
    setShowPayPal(false);
    fetchUserData();
  };

  const onError = () => {
    toast.error("Error al procesar el pago");
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
          <p className="text-azulc text-2xl font-[Open_Sans] font-bold">
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
        {userData.premium == 1 ? (
          <button
            onClick={() => handleCancelPremium()}
            className="flex gap-2 bg-red-600 text-white font-[Open_Sans] px-3 py-2 mt-3 rounded-xl cursor-pointer"
          >
            Cancelar Premium <Crown />
          </button>
        ) : showPayPal ? (
          <div className="w-80 mt-3">
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            </PayPalScriptProvider>
            <button
              onClick={() => setShowPayPal(false)}
              className="w-full bg-gray-500 text-white font-[Open_Sans] px-3 py-2 mt-2 rounded-xl cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleBuyPremium()}
            className="flex gap-2 bg-yellow-600 text-white font-[Open_Sans] px-3 py-2 mt-3 rounded-xl cursor-pointer"
          >
            Comprar Premium <Crown />
          </button>
        )}
        <div className="mt-10 mb-5">
          <button
            onClick={async () => {
              if (
                confirm(
                  "¿Seguro que quieres eliminar tu cuenta? Todos tus datos se borrarán.",
                )
              ) {
                try {
                  const { idUser } = JSON.parse(
                    localStorage.getItem("userData"),
                  );
                  await api.deleteUser(idUser);
                  localStorage.removeItem("userData");
                  localStorage.removeItem("lastNote");
                  navigate("/", { replace: true });
                  toast.success("Cuenta eliminada");
                } catch (err) {
                  toast.error(err.message);
                }
              }
            }}
            className="flex gap-2 items-center bg-red-600 text-white font-[Open_Sans] px-4 py-2 rounded-xl cursor-pointer hover:bg-red-700"
          >
            <Trash2 size={18} /> Eliminar cuenta
          </button>
        </div>
      </div>
    </>
  );
};
