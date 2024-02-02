import { useEffect } from "react";
import ErrorContent from "../UI/ErrorComponents/ErrorContent";

function Error() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ErrorContent />;
}

export default Error;
