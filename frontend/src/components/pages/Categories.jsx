import CategoriesList from "../UI/CategoriesComponents/CategoriesList";

import { useEffect } from "react";

function Categories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CategoriesList />
    </>
  );
}

export default Categories;
