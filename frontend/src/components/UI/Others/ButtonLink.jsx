import { Link } from "react-router-dom";

function ButtonLink({ children, className, path }) {
  return (
    <Link to={path} className={className}>
      {children}
    </Link>
  );
}

export default ButtonLink;
