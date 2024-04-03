import { useEffect } from "react";

export const useScrollToTop = function () {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
