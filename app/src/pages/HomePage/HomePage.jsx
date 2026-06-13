import { useNavigate } from "react-router-dom";
import { Folder } from "./components/Folder";
import { Header } from "../../components/Header";
import { LogOut } from "lucide-react";
import { Modal } from "./components/Modal";
import { ButtonFloat } from "../../components/ButtonFloat";
import { useHomePage } from "./hooks/useHomePage";

export const HomePage = () => {
  const navigate = useNavigate();
  const {
    foldersFilter,
    nameFolder,
    showModal,
    setShowModal,
    handleCreateFolder,
    handleDeleteFolder,
    handleChange,
    handleSearch,
  } = useHomePage();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const handleCloseSession = () => {
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header
        left={
          <span className="text-white text-xl font-bold font-[Open_Sans] text-lg">
            Bienvenida {userData.username}
          </span>
        }
        right={
          <button
            onClick={handleCloseSession}
            className="flex gap-3 bg-cafef duration-300 font-bold font-[Open_Sans] text-xl rounded px-2 py-2 text-white cursor-pointer hover:bg-cafec"
          >
            <LogOut />
            Cerrar Sesión
          </button>
        }
      />
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        handleChange={handleChange}
        nameFolder={nameFolder}
        handleCreateFolder={handleCreateFolder}
      />
      <div className="flex justify-center gap-3">
        <input
          onChange={handleSearch}
          className="border border-gray-600 rounded p-1 my-2"
          type="text"
          placeholder="Buscar carpeta..."
        />
      </div>
      {foldersFilter.length === 0 ? (
        <p className="text-center">No se encontraron carpetas...</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-8 px-5">
          {foldersFilter.map((folder) => (
            <li key={folder.idFolder} className="list-none">
              <Folder
                name={folder.title}
                idFolder={folder.idFolder}
                handleDeleteFolder={handleDeleteFolder}
              />
            </li>
          ))}
        </ul>
      )}
      <ButtonFloat handleClick={() => setShowModal(true)} />
    </>
  );
};
