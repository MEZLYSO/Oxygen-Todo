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
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          onChange={handleChange}
          className="border-1 text-black"
          type="email"
          name=""
        />
        <input
          id="password"
          onChange={handleChange}
          className="border-1"
          type="text"
          name=""
        />
        <button>Iniciar sesion</button>
      </form>
    </section>
  );
};
