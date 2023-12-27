import classes from "./Notification.module.css";

import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <div className={classes.notification}>
      <span className={classes.notification__message}>
        {notification.message}
      </span>
    </div>
  );
}

export default Notification;
