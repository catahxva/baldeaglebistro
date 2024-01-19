import classes from "./VerifyAccountContent.module.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { verifyAccount } from "../../../util/requests";

function VerifyAccountContent() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { token } = useParams();

  const [verifyText, setVerifyText] = useState(
    "Verifying your account, please wait..."
  );
  const [visibleLink, setVisibleLink] = useState(false);

  const { mutate } = useMutation({
    mutationFn: verifyAccount,
    onError: (error) => {
      setVerifyText(error.message);
      setVisibleLink(true);
    },
    onSuccess: (data) => {
      setVerifyText("Verification successful. You will soon be redirected.");

      dispatch(
        authActions.authenticate({
          token: data.token,
          role: data.user.role,
          email: data.user.email,
          username: data.user.username,
          address: data.user.address,
        })
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });

  useEffect(() => {
    mutate({ token });
  }, []);

  return (
    <div className={classes.verify__account}>
      <span className={classes.verify__account__span}>{verifyText}</span>
      {visibleLink && (
        <Link to="/" className={classes.verify__account__link}>
          Go to home page
        </Link>
      )}
    </div>
  );
}

export default VerifyAccountContent;
