import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import icon from "../../assets/img.png";

export const LoginPage = () => {
  const [registro, setRegistro] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const changeState = () => {
    setRegistro(!registro);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (registro) {
        await api.register(data);
        toast.success("user created");
        setRegistro(false);
        setData({ email: data.email, password: data.password });
        return;
      }
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
    <section className="bg-fondo h-screen w-screen flex items-center">
      <div className="w-1/2 h-full object-cover">
        <img className="object-cover w-full h-full" src={icon} alt="" />
      </div>
      <div className="w-1/2 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col">
          <h2 className="text-5xl text-center font-bold text-azulf font-[Open_Sans] gap-3">
            {registro ? "Registrar" : "Iniciar sesión"}
          </h2>

            {
              registro && (
                <>
                  <label htmlFor="username"
                    className="py-2 px-1 font-bold mt-5 font-[Open_Sans] text-xl text-cafef"
                  >
                    Nombre usuario:
                  </label>
                <input
                  id="username"
                  onChange={handleChange}
                  className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
                  type="user"
                  name=""
                  placeholder="juanperez"
                />
                </>
              )
            }

          <label
            htmlFor="email"
            className="py-2 px-1 mt-3 font-bold font-[Open_Sans] text-xl text-cafef"
          >
            Correo:
          </label>
          <input
            id="email"
            onChange={handleChange}
            className="border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
            type="email"
            name=""
            placeholder="juanperez@gmail.com"
          />
          <label
            htmlFor="password"
            className="mt-10 font-bold font-[Open_Sans] text-xl text-cafef"
          >
            Contraseña:
          </label>
          <input
            id="password"
            onChange={handleChange}
            className="border-1 text-azulf font-extrabold font-[Open_Sans] text-xl py-2 px-2 mb-3 rounded-xl focus:outline-hidden focus:border-cafec"
            type="password"
            name=""
            placeholder="*****"
          />
          <button className="bg-azulf duration-300 font-bold font-[Open_Sans] text-xl rounded-2xl px-2 py-2 text-white mt-10 gap-3 cursor-pointer hover:bg-cafef">
            {registro ? "Registrarse" : "Iniciar sesión"}
          </button>

          <p className="text-cafef font-[Open-Sans] mt-3 flex justify-center gap-3">
            {registro ? "¿Ya tienes una cuenta?  " : "¿No tienes una cuenta?  "}
            <button onClick={changeState} type="button" className="text-azulf">
              {registro ? " Inicia sesión " : " Registrate "}
              aquí
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};
