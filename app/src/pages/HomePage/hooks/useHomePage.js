import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../../../services/api";

export function useHomePage() {
  const [folders, setFolders] = useState([]);
  const [nameFolder, setNameFolder] = useState({ title: "" });
  const [foldersFilter, setFoldersFilter] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFolder, setEditFolder] = useState({ idFolder: null, title: "" });

  const getUser = () => JSON.parse(localStorage.getItem("userData"));

  const fetchFolders = async () => {
    try {
      const { idUser } = getUser();
      const data = await api.getFoldersByUser(idUser);
      setFolders(data);
      setFoldersFilter(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateFolder = async () => {
    if (!nameFolder.title || nameFolder.title.trim() === "") return;
    try {
      const { idUser } = getUser();
      const data = await api.createFolder({ ...nameFolder, idUser });
      toast.success(data.message);
      setNameFolder({ title: "" });
      setShowModal(false);
      fetchFolders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFolder = async (idFolder) => {
    try {
      await api.deleteFolder(idFolder);
      const updatedList = folders.filter((f) => f.idFolder !== idFolder);
      setFolders(updatedList);
      setFoldersFilter(updatedList);
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleChange = (e) => {
    setNameFolder({ ...nameFolder, [e.target.id]: e.target.value });
  };

  const handleOpenEdit = (idFolder, title) => {
    setEditFolder({ idFolder, title });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditFolder({ ...editFolder, [e.target.id]: e.target.value });
  };

  const handleUpdateFolder = async () => {
    if (!editFolder.title || editFolder.title.trim() === "") return;
    try {
      const data = await api.updateFolder({ idFolder: editFolder.idFolder, title: editFolder.title });
      toast.success(data.message);
      setShowEditModal(false);
      fetchFolders();
    } catch (error) {
      console.error(error);
    }
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
    showEditModal,
    setShowEditModal,
    editFolder,
    handleOpenEdit,
    handleEditChange,
    handleUpdateFolder,
  };
}