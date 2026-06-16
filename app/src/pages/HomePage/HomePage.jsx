import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ButtonFloat } from "../../components/ButtonFloat";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { FolderList } from "./components/FolderList";
import { SearchBar } from "./components/SearchBar";
import { useHomePage } from "./hooks/useHomePage";
import logo from "../../assets/logo1.png";


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
  const handleChangeUserPage = () => {
    navigate("/user", { replace: true });
  };
  return (
    <>
      <Header
        left={
          <span className="flex text-white text-xl font-[Open_Sans] text-4xl gap-1">
             <img className="hidden md:flex w-15 bg-white/85 rounded-xl " src={logo} alt="" />
            <p className="hidden md:flex items-center px-3">Hola!  </p>
            <p className="font-bold hidden md:flex items-center">{userData.username}</p>
          </span>
        }
        center={<SearchBar handleSearchCallback={handleSearch} />}
        right={
          <button
            onClick={handleChangeUserPage}
            className="flex gap-3 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded-xl px-2 py-1 text-white cursor-pointer hover:bg-cafec"
          >
            <User />
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
      <div className="pt-8">
        <FolderList
        listFolders={foldersFilter}
        handleDeleteFolder={handleDeleteFolder}
        handleOpenEdit={handleOpenEdit}
      />
      </div>
      <ButtonFloat handleClick={() => setShowModal(true)} />
    </>
  );
};
