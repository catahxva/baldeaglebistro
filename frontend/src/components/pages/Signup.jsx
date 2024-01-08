import SignupContent from "../UI/AllAuthComponents/SignupContent";

import { useAuthRedirect } from "../../hooks/useAuthRedirect";

function Signup() {
  useAuthRedirect();

  return <SignupContent />;
}

export default Signup;
