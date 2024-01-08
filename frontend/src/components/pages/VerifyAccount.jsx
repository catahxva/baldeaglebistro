import VerifyAccountContent from "../UI/AllAuthComponents/VerifyAccountContent";

import { useAuthRedirect } from "../../hooks/useAuthRedirect";

function VerifyAccount() {
  useAuthRedirect();

  return <VerifyAccountContent />;
}

export default VerifyAccount;
