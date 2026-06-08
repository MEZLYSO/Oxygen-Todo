import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Folder } from "./components/Folder";

export const HomePage = () => {
  const [folders, setFolders] = useState([]);
  const [nameFolder, setNameFolder] = useState({ title: "" }); // 1. Inicializado con el campo esperado
  const [foldersFilter, setFoldersFilter] = useState([]);

  const handleCreateFolder = async () => {
    if (!nameFolder.title || nameFolder.title.trim() === "") return; // Validación básica

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

      if (resp.ok) {
        setNameFolder({ title: "" }); // 4. Limpia el formulario/estado al crear
        fetchFolders();
      }
    } catch (error) {
      console.error(error);
    }
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
      setFoldersFilter(data); // 2. CORRECCIÓN: Llenamos también el filtro al cargar por primera vez
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFolder = async (idFolder) => {
    try {
      const resp = await fetch(`http://localhost:8080/folder/${idFolder}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        // Actualizamos ambas listas para mantener sincronizado el buscador si está activo
        const updatedList = folders.filter((f) => f.idFolder !== idFolder);
        setFolders(updatedList);
        setFoldersFilter(updatedList);
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const navigate = useNavigate();
  const handleCloseSession = () => {
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    setNameFolder({ ...nameFolder, [e.target.id]: e.target.value });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();

    if (term === "") {
      setFoldersFilter(folders);
      return;
    }
    const listFilter = folders.filter((folder) =>
      folder.title.toLowerCase().includes(term),
    );
    setFoldersFilter(listFilter);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mis Carpetas</h2>
      <div>
        <input
          onChange={handleSearch}
          className="border border-gray-300 rounded p-1 mb-4"
          type="text"
          placeholder="Buscar carpeta..."
        />
      </div>
      <button
        onClick={handleCloseSession}
        className="mb-4 bg-gray-200 px-3 py-1 rounded"
      >
        Cerrar Sesión
      </button>

      <div className="border p-4 rounded mb-4">
        <input
          id="title"
          onChange={handleChange}
          value={nameFolder.title} // 4. Vinculado al estado para poder limpiarse
          type="text"
          placeholder="agrega un nombre"
          className="border p-1 mr-2"
        />
        <button
          onClick={handleCreateFolder}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Crear
        </button>
      </div>

      {foldersFilter.length === 0 ? (
        <p>No se encontraron carpetas...</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {/* 3. CORRECCIÓN: Mapeamos 'foldersFilter', no 'folders' */}
          {foldersFilter.map((folder) => (
            <li key={folder.idFolder} className="list-none">
              <Folder
                name={folder.title}
                idFolder={folder.idFolder}
                handleDeleteFolder={handleDeleteFolder} // 5. Ajustado al nombre exacto que recibe tu prop en Folder
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
