import ResetForgotPassContent from "../UI/AllAuthComponents/ResetForgotPassContent";

import { useAuthRedirect } from "../../hooks/useAuthRedirect";

function ResetForgotPass() {
  useAuthRedirect();

  return <ResetForgotPassContent />;
}

export default ResetForgotPass;
