import { Plus } from "lucide-react";

export const ButtonFloat = ({ handleClick }) => {
  return (
    <div className="fixed bottom-0 right-0 p-2">
      <div onClick={handleClick} className="bg-green-300 rounded-lg">
        <Plus className="w-10 h-10" />
      </div>
    </div>
  );
};
