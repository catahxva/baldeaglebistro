import { useEffect } from "react";

import SearchContent from "../UI/SearchComponents/SearchContent";

function Search() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SearchContent />
    </>
  );
}

export default Search;
