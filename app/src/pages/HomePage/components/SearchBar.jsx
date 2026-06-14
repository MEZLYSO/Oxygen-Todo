export const SearchBar = ({ handleSearchCallback }) => {
  return (
    <input
      onChange={handleSearchCallback}
      className="w-[200px] md:w-[350px] sm:w-[500px] bg-white border border-slate-300 focus:outline-none rounded p-1 my-2"
      type="text"
      placeholder="Buscar carpeta..."
    />
  );
};
