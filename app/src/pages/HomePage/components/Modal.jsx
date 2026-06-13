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
      className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black/30"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="max-h-26 bg-white shadow-slate-300 shadow-md p-5 w-auto rounded"
      >
        <input
          id="title"
          onChange={handleChange}
          value={nameFolder.title}
          type="text"
          placeholder="agrega un nombre"
          className="border-1 text-azulf font-bold font-[Open_Sans] text-xl px-2 py-2 rounded focus:outline-hidden focus:border-cafec"
        />

        <button
          type="button"
          onClick={handleCreateFolder}
          className="bg-azulf duration-300 font-bold font-[Open_Sans] text-xl rounded px-2 py-2 mb-10 text-white mt-3 cursor-pointer hover:bg-cafec"
        >
          Crear
        </button>
      </form>
    </div>
  );
};
