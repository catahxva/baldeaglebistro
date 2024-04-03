import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/slices/uiSlice";

export const useDeleteNotification = function () {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(uiActions.hideNotification());
    };
  }, []);
};
