export const Header = ({ title, left, right }) => {
  return (
    <div className="fixed bg-azulf w-full h-auto px-5 py-6 flex items-center justify-center">
      <div className="absolute left-5">{left}</div>
      <h1 className="text-white text-center font-extrabold font-[Open_Sans] text-3xl">{title}</h1>
      <div className="absolute right-5">{right}</div>
    </div>
  );
};
