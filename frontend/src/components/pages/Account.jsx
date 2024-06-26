import AccountContent from "../UI/AccountComponents/AccountContent";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!userToken) navigate("/");

    window.scrollTo(0, 0);
  }, []);

  return <AccountContent />;
}

export default Account;
