import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../services/api";

export const LoginPage = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(data);
      if (response.message) {
        toast.error(response.message);
        return;
      }
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/home", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="h-screen bg-fondo flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col">
          <h2 className="text-5xl text-center font-bold text-azulf font-[Open_Sans]">Iniciar sesion</h2>
          <label htmlFor="email" className="py-2 px-1 mt-20 font-bold font-[Open_Sans] text-xl text-cafef">Correo:</label>
          <input
            id="email"
            onChange={handleChange}
            className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
            type="email"
            name=""
            placeholder="juanperez@gmail.com"
          />
          <label htmlFor="password" className="mt-10 font-bold font-[Open_Sans] text-xl text-cafef">Contraseña:</label>
          <input
            id="password"
            onChange={handleChange}
            className="border-1 text-azulf font-extrabold font-[Open_Sans] text-xl py-2 px-2 mb-3 rounded-xl focus:outline-hidden focus:border-cafec"
            type="password"
            name=""
            placeholder="*****"
          />
          <button className="bg-azulf duration-300 font-bold font-[Open_Sans] text-xl rounded-2xl px-2 py-2 text-white mt-10 gap-3 cursor-pointer hover:bg-cafef">Iniciar sesion</button>
        </form>
    </section>
  );
};
