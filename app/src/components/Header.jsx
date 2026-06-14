export const Header = ({ left, center, right }) => {
  return (
    <div className="bg-azulf w-full h-16 px-5 flex items-center justify-center">
      <div className="absolute left-5">{left}</div>
      {center}
      <div className="absolute right-5">{right}</div>
    </div>
  );
};
