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
          <span className="flex items-center gap-2">
            <img
              className="w-10 h-10 bg-white rounded-full object-contain p-1"
              src={logo}
              alt=""
            />
            <div className="flex flex-col leading-none">
              <p className="text-white/70 text-xs font-[Open_Sans]">Hola!</p>
              <p className="text-white text-lg font-bold font-[Open_Sans] -mt-0.5">
                {userData.username}
              </p>
            </div>
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
