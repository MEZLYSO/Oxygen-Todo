import { Navigate, Outlet } from "react-router-dom";

const PrivateGuard = () => {
  const token = localStorage.getItem("userData");
  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

export default PrivateGuard;
