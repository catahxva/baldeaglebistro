import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/authSlice";

export const useTokenExpiration = function () {
  const dispatch = useDispatch();

  const expirationDate = useSelector((state) => state.auth.expirationDate);

  useEffect(() => {
    const expirationTime = new Date(expirationDate);
    const currentTime = new Date();

    let timer;

    if (currentTime > expirationTime) dispatch(authActions.deauthenticate());

    if (expirationTime > currentTime) {
      const timeDifference = expirationTime - currentTime;

      timer = setTimeout(() => {
        dispatch(authActions.deauthenticate());
      }, timeDifference);
    }

    return () => clearTimeout(timer);
  }, [expirationDate]);
};
