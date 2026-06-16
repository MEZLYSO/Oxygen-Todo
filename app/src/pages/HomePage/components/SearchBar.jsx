export const SearchBar = ({ handleSearchCallback }) => {
  return (
    <input
      onChange={handleSearchCallback}
      className="w-[200px] md:w-[350px] sm:w-[500px] bg-white border-1 text-azulf font-bold font-[Open_Sans] text-xl py-2 px-2 rounded-xl focus:outline-hidden focus:border-cafec"
      type="text"
      placeholder="Buscar carpeta..."
    />
  );
};
