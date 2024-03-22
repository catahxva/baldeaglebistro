import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

export const useLatestAddress = function () {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [data, setData] = useState();

  useEffect(() => {
    const getAddress = async function () {
      const response = await fetch(
        `http://localhost:3000/mainapi/bald-eagle/users/user-address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === "fail") return;

      setData(data.data.data);
    };

    getAddress();
  }, [token]);

  useEffect(() => {
    if (data) dispatch(authActions.updateUserAddress({ address: data }));
  }, [data]);
};
