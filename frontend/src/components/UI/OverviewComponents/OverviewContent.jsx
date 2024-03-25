import classes from "./OverviewContent.module.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useFiltersContent } from "../../../hooks/useFiltersContent";
import { useProductsContent } from "../../../hooks/useProductsContent";
import { useParamsData } from "../../../hooks/useParamsData";

import OverviewAppliedFilters from "./OverviewAppliedFilters";
import OverviewSort from "./OverviewSort";
import MobileMenu from "../Others/MobileMenu";

function OverviewContent() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    setMobileMenu(false);
  }, [searchParams]);

  const { paramsEntries } = useParamsData();

  const { filtersContent, mobileFiltersContent } = useFiltersContent();
  const productsContent = useProductsContent();

  return (
    <section className="first__section section__min__height">
      <h2>All products</h2>
      <MobileMenu openMobileMenu={mobileMenu} closeMobileMenu={setMobileMenu}>
        {mobileFiltersContent}
      </MobileMenu>
      <div className={classes.overview__content__grid}>
        <div className={classes.overview__content__grid__container}>
          {filtersContent}
        </div>
        <div className={classes.overview__content__grid__container}>
          <button
            onClick={() => setMobileMenu(true)}
            className={classes.overview__content__mobile__btn}
          >
            Show Filters
          </button>
          {paramsEntries.length > 0 && <OverviewAppliedFilters />}
          <OverviewSort />
          {productsContent}
        </div>
      </div>
    </section>
  );
}

export default OverviewContent;
