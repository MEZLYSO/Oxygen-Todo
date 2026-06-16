import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../services/api";

export function usePageUser() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    premium: 0,
  });

  const localUser = () => JSON.parse(localStorage.getItem("userData"));

  const fetchUserData = async () => {
    try {
      const { idUser } = localUser();
      const data = await api.getUserById(idUser);
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleClickPremium = async () => {
    try {
      const { idUser, premium } = localUser();
      const updatedPremiumValue = premium == 1 ? 0 : 1;
      const data = await api.updatePremium({
        idUser,
        premium: updatedPremiumValue,
      });
      fetchUserData();
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userData,
    setUserData,
    fetchUserData,
    handleClickPremium,
  };
}
