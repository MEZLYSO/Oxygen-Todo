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
    const { idUser } = localUser();
    const data = await api.getUserById(idUser);
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const handleClickPremium = async () => {
    const { idUser, premium } = localUser();
    const updatedPremiumValue = premium == 1 ? 0 : 1;
    const status = await api.updatePremium({
      idUser,
      premium: updatedPremiumValue,
    });
    fetchUserData();
    toast.success(status.message);
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
