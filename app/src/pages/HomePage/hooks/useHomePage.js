import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useHomePage() {
  const [folders, setFolders] = useState([]);
  const [nameFolder, setNameFolder] = useState({ title: "" });
  const [foldersFilter, setFoldersFilter] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(false);
        fetchFolders();
      }
    } catch (error) {
      console.error(error);
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

  return {
    folders,
    foldersFilter,
    nameFolder,
    showModal,
    setShowModal,
    handleCreateFolder,
    handleDeleteFolder,
    handleChange,
    handleSearch,
  };
}