import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await resp.json();
      if (response.message) {
        console.log("Error del servidor:", response.message);
        return;
      }
      console.log(response);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/home", { replace: true });
    } catch (err) {
      console.log("Error en la peticion:", err.message);
    }
  };

  return (
    <section>
      <form className="flex flex-col  px-180 py-60" onSubmit={handleSubmit}>
          <h2 className="text-5xl text-center font-bold text-blue-800 font-[Open_Sans]">Iniciar sesion</h2>
          <label htmlFor="email" className="py-2 px-1 mt-20 font-bold font-[Open_Sans] text-xl text-[#6394BF]">Correo:</label>
          <input
            id="email"
            onChange={handleChange}
            className="border-1 text-blue-800 font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-[#FFA877]"
            type="email"
            name=""
            placeholder="juanlopez@gmail.com"
          />
          <label htmlFor="password" className="mt-10 font-bold font-[Open_Sans] text-xl text-[#6394BF]">Contraseña:</label>
          <input
            id="password"
            onChange={handleChange}
            className="border-1 text-blue-800 font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-[#FFA877]"
            type="password"
            name=""
            placeholder="*****"
          />
          <button className="bg-[#021F59] font-bold font-[Open_Sans] text-xl rounded-2xl px-2 py-2 text-white mt-10 gap-3 cursor-pointer hover:bg-[#D95448]">Iniciar sesion</button>
        </form>
    </section>
  );
};
