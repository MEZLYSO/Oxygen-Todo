import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { LogOut } from "lucide-react";
import { Modal } from "../../components/Modal";
import { ButtonFloat } from "../../components/ButtonFloat";
import { useHomePage } from "./hooks/useHomePage";
import { SearchBar } from "./components/SearchBar";
import { FolderList } from "./components/FolderList";

export const HomePage = () => {
  const navigate = useNavigate();
  const {
    foldersFilter,
    nameFolder,
    handleCreateFolder,
    handleDeleteFolder,
    handleChange,
    handleSearch,
    showEditModal,
    setShowEditModal,
    setShowModal,
    showModal,
    editFolder,
    handleOpenEdit,
    handleEditChange,
    handleUpdateFolder,
  } = useHomePage();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleCloseSession = () => {
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header
        left={
          <span className="flex text-white text-xl font-[Open_Sans] text-4xl gap-2">
            <p className="hidden md:flex">Hola! </p>
            <p className="font-bold">{userData.username}</p>
          </span>
        }
        center={<SearchBar handleSearchCallback={handleSearch} />}
        right={
          <button
            onClick={handleCloseSession}
            className="flex gap-3 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded px-2 py-1 text-white cursor-pointer hover:bg-cafec"
          >
            <LogOut />
          </button>
        }
      />
      <Modal
        titleModal="Nueva carpeta"
        textButton="Crear"
        placeholder="Nombre de la carpeta"
        visible={showModal}
        onClose={() => setShowModal(false)}
        value={nameFolder.title}
        onChange={handleChange}
        onClick={handleCreateFolder}
      />
      <Modal
        titleModal="Editar carpeta"
        textButton="Guardar"
        placeholder="Nuevo nombre"
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        value={editFolder.title}
        onChange={handleEditChange}
        onClick={handleUpdateFolder}
      />
      <FolderList
        listFolders={foldersFilter}
        handleDeleteFolder={handleDeleteFolder}
        handleOpenEdit={handleOpenEdit}
      />
      <ButtonFloat handleClick={() => setShowModal(true)} />
    </>
  );
};
