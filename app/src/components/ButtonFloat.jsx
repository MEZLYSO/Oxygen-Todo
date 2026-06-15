import { Plus } from "lucide-react";

export const ButtonFloat = ({ handleClick }) => {
  return (
    <div className="fixed bottom-5 right-5 p-2">
      <div onClick={handleClick} className="bg-azulf text-white rounded-full p-2 cursor-pointer hover:bg-cafef">
        <Plus className="w-10 h-10" />
      </div>
    </div>
  );
};
