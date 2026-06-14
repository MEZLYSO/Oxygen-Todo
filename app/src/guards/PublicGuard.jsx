import { Navigate, Outlet } from "react-router-dom";

const PublicGuard = () => {
  const token = localStorage.getItem("userData");
  return token ? (
    <Navigate replace to="/home" />
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default PublicGuard;