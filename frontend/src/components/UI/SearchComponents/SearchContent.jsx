import classes from "./SearchContent.module.css";

import { useState } from "react";

import SearchForm from "./SearchForm";
import SearchGrid from "./SearchGrid";

function SearchContent() {
  const [query, setQuery] = useState();


  return (
    <section className="first__section section__min__height">
      <h2>Search for products</h2>
      <SearchForm changeQuery={setQuery} />
      <div className={classes.search__content__container}>
        {!query && (
          <span className={classes.search__placeholder}>
            Your search results will appear here
          </span>
        )}
        {query && <SearchGrid query={query} />}
      </div>
    </section>
  );
}

export default SearchContent;
