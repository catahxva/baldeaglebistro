import classes from "./RootAuthContent.module.css";

function RootAuthContent({ outlet }) {
  return <div className={classes.auth__content}>{outlet}</div>;
}

export default RootAuthContent;
