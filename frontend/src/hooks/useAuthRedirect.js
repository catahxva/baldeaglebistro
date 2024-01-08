import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = function () {
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);
};
