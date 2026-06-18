import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export function usePageUser() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    premium: 0,
    idUser: null,
  });

  const [userDataUpdate, setUserDataUpdate] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPayPal, setShowPayPal] = useState(false);

  const localUser = () => JSON.parse(localStorage.getItem("userData"));

  const fetchUserData = async () => {
    try {
      const { idUser } = localUser();
      const data = await api.getUserById(idUser);
      setUserData(data);
      setUserDataUpdate({
        username: data.username || "",
        email: data.email || "",
        password: data.password || "",
      });
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleBuyPremium = () => {
    setShowPayPal(true);
  };

  const handleCancelPremium = async () => {
    try {
      const { idUser } = localUser();
      const data = await api.updatePremium({ idUser, premium: 0 });
      fetchUserData();
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCloseSession = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("lastNote");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userData,
    setUserData,
    fetchUserData,
    handleBuyPremium,
    handleCancelPremium,
    handleCloseSession,
    userDataUpdate,
    setUserDataUpdate,
    showPayPal,
    setShowPayPal,
  };
}
