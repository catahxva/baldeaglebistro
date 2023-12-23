import { Link } from "react-router-dom";

function ButtonLink({ children, className }) {
  return <Link className={className}>{children}</Link>;
}

export default ButtonLink;
