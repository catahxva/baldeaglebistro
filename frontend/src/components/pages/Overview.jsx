import { useEffect } from "react";

import OverviewContent from "../UI/OverviewComponents/OverviewContent";

function Overview() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <OverviewContent />
    </>
  );
}

export default Overview;
