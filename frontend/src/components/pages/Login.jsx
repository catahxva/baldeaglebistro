import LoginContent from "../UI/AllAuthComponents/LoginContent";

import { useAuthRedirect } from "../../hooks/useAuthRedirect";

function Login() {
  useAuthRedirect();

  return <LoginContent />;
}

export default Login;
