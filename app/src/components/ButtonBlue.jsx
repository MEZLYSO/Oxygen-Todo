export const ButtonBlue = ({ text, handleClick, params }) => {
  return (
    <button
      className="bg-blue-400 text-white text-sm font-bold px-4 py-2 w-full rounded"
      onClick={() => handleClick(params)}
    >
      {text}
    </button>
  );
};
