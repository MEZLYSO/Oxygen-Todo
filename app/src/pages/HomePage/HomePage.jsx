import { useEffect, useState } from "react";
import { User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ButtonFloat } from "../../components/ButtonFloat";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { FolderList } from "./components/FolderList";
import { SearchBar } from "./components/SearchBar";
import { useHomePage } from "./hooks/useHomePage";
import { api } from "../../services/api";
import { timeAgo } from "../../utils/timeAgo";
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
  const [dailyNote, setDailyNote] = useState(null);
  const lastNote = JSON.parse(localStorage.getItem("lastNote"));

  useEffect(() => {
    if (userData.premium == 1) {
      api.getNotesByUser(userData.idUser).then((notes) => {
        const random = notes[Math.floor(Math.random() * notes.length)];
        setDailyNote(random);
      });
    }
  }, []);

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
      <div className="pt-8 px-4">
        {dailyNote && (
          <div
            onClick={() =>
              navigate("/note/" + dailyNote.idNote, { replace: true })
            }
            className="bg-azulf text-white px-4 py-2 rounded-lg mb-5 cursor-pointer hover:opacity-85"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold font-[Open_Sans] truncate">
                {dailyNote.title}
              </p>
              <p className="font-[Open_Sans] text-xs text-white/60  ml-2">
                {timeAgo(dailyNote.createdAt)}
              </p>
            </div>
            <p className="font-[Open_Sans] text-sm text-white/80 line-clamp-2">
              {dailyNote.content}
            </p>
          </div>
        )}
        {lastNote && userData.premium == 1 && (
          <div
            onClick={() => navigate("/note/" + lastNote.idNote, { replace: true })}
            className="bg-cafef text-white px-4 py-2 rounded-lg mb-5 cursor-pointer hover:opacity-85"
          >
            <p className="font-bold font-[Open_Sans] text-sm truncate">
              Continuar: {lastNote.title}
            </p>
          </div>
        )}
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
