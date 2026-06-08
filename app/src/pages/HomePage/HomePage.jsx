import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [folders, setFolders] = useState([]);
  const [nameFolder, setNameFolder] = useState({});

  const handleCreateFolder = async () => {
    try {
      const storedUser = localStorage.getItem("userData");
      const userData = JSON.parse(storedUser);

      const resp = await fetch("http://localhost:8080/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...nameFolder, idUser: userData.idUser }),
      });
      fetchFolders();
    } catch (error) {}
  };

  const fetchFolders = async () => {
    try {
      const storedUser = localStorage.getItem("userData");
      const userData = JSON.parse(storedUser);

      const resp = await fetch(
        `http://localhost:8080/folder/${userData.idUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!resp.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await resp.json();
      setFolders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFolder = async (idFolder) => {
    try {
      const resp = await fetch(`http://localhost:8080/folder/${idFolder}`, {
        method: "DELETE",
      });

      setFolders(folders.filter((f) => f.idFolder !== idFolder));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const navigate = useNavigate();
  const handleCloseSession = () => {
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  const enterInPage = (id) => {
    navigate(`/folder/${id}`, { replace: true });
  };

  const handleChange = (e) => {
    setNameFolder({ ...nameFolder, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mis Carpetas</h2>
      <button onClick={handleCloseSession}>Login</button>
      <div className="border-1">
        <input
          id="title"
          onChange={handleChange}
          type="text"
          placeholder="agrega un nombre"
        />
        <button onClick={handleCreateFolder}>Crear</button>
      </div>
      {folders.length === 0 ? (
        <p>No tienes carpetas creadas aún o están cargando...</p>
      ) : (
        <ul>
          {folders.map((f, index) => (
            <>
              <li
                onClick={() => enterInPage(f.idFolder)}
                idFolder={f.idFolder}
                key={f.id || index}
              >
                {f.idFolder}-<span>{f.title} </span>
              </li>
              <button onClick={() => handleDeleteFolder(f.idFolder)}>
                Eliminar
              </button>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
