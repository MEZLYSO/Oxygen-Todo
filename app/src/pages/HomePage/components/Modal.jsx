export const Modal = ({
  visible,
  onClose,
  handleChange,
  nameFolder,
  handleCreateFolder,
}) => {
  if (!visible) return null;
  return (
    <div
      onClick={onClose}
      className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black/40 z-50"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
      >
        <h2 className="text-azulf font-bold font-[Open_Sans] text-2xl text-center">
          Nueva carpeta
        </h2>
        <input
          id="title"
          onChange={handleChange}
          value={nameFolder.title}
          type="text"
          placeholder="Nombre de la carpeta"
          className="border border-gray-300 text-azulf font-bold font-[Open_Sans] text-lg px-3 py-2 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cafec focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleCreateFolder}
          className="bg-azulf duration-300 font-bold font-[Open_Sans] text-lg rounded-lg px-2 py-2 text-white cursor-pointer hover:bg-cafec"
        >
          Crear
        </button>
      </form>
    </div>
  );
};
