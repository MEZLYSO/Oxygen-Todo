import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Folder } from "./components/Folder";
import toast from "react-hot-toast";
import { Header } from "../../components/Header";
import { LogOut } from "lucide-react";
import { Modal } from "../../components/Modal";

export const HomePage = () => {
  const [folders, setFolders] = useState([]);
  const [nameFolder, setNameFolder] = useState({ title: "" });
  const [foldersFilter, setFoldersFilter] = useState([]);

  const handleCreateFolder = async () => {
    if (!nameFolder.title || nameFolder.title.trim() === "") return;
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

      const data = await resp.json();

      if (resp.ok) {
        toast.success(data.message);
        setNameFolder({ title: "" });
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
      setFoldersFilter(data);
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
    <>
      <Header title={"Menu principal"} />
      <div className="flex bg-fondo pt-10">
        <input
          onChange={handleSearch}
          className="border border-gray-600 rounded p-1 mb-4"
          type="text"
          placeholder="Buscar carpeta..."
        />
      </div>
      <Modal />
      <button
        onClick={handleCloseSession}
        className="flex gap-3 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded px-2 py-2 text-white mb-3 cursor-pointer hover:bg-cafec"
      >
        <LogOut />
        Cerrar Sesión
      </button>

      <div className="flex justify-center gap-3">
        <input
          id="title"
          onChange={handleChange}
          value={nameFolder.title}
          type="text"
          placeholder="agrega un nombre"
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl px-2 py-2 mt-3 mb-10 rounded focus:outline-hidden focus:border-cafec"
        />

        <button
          onClick={handleCreateFolder}
          className="bg-azulf duration-300 font-bold font-[Open_Sans] text-xl rounded px-2 py-2  mb-10 text-white mt-3 cursor-pointer hover:bg-cafec"
        >
          Crear
        </button>
      </div>

      {foldersFilter.length === 0 ? (
        <p>No se encontraron carpetas...</p>
      ) : (
        <ul className="flex flex-wrap justify-none gap-3">
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
    </>
  );
};
