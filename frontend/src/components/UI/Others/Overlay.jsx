import classes from "./Overlay.module.css";

function Overlay({ close }) {
  return <div onClick={() => close(false)} className={classes.overlay}></div>;
}

export default Overlay;
