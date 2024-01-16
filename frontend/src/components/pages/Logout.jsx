import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authActions.deauthenticate());

    navigate("/");
  }, []);

  return <div></div>;
}

export default Logout;
