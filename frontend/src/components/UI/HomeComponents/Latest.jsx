import classes from "./Latest.module.css";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../../util/requests";

import LatestContent from "./LatestContent";
import Placeholder from "../Others/Placeholder";

function Latest() {
  const [enabledQuery, setEnabledQuery] = useState("appetizers");

  const createQueryStr = (category) => `?category=${category}&sort=latest`;

  const {
    data: appetizers,
    isPending: isPendingAppetizers,
    isError: isErrorAppetizers,
    error: appetizersError,
  } = useQuery({
    queryKey: ["appetizers"],
    queryFn: ({ signal }) => fetchProducts(signal, createQueryStr("appetizer")),
  });

  const {
    data: main,
    isLoading: isLoadingMain,
    isError: isErrorMain,
    error: mainError,
  } = useQuery({
    queryKey: ["main"],
    queryFn: ({ signal }) => fetchProducts(signal, createQueryStr("main dish")),
    enabled: enabledQuery === "main",
  });

  const {
    data: sides,
    isLoading: isLoadingSides,
    isError: isErrorSides,
    error: sidesError,
  } = useQuery({
    queryKey: ["sides"],
    queryFn: ({ signal }) => fetchProducts(signal, createQueryStr("side")),
    enabled: enabledQuery === "sides",
  });

  let content;

  if (isPendingAppetizers || isLoadingMain || isLoadingSides) {
    content = <Placeholder type="loading" />;
  }

  switch (enabledQuery) {
    case "appetizers":
      if (isErrorAppetizers) {
        content = (
          <Placeholder type="error" message={appetizersError.message} />
        );
      }

      if (appetizers) {
        content = <LatestContent enabledQuery={enabledQuery} />;
      }
      break;

    case "main":
      if (isErrorMain) {
        content = <Placeholder type="error" message={mainError.message} />;
      }

      if (main) {
        content = <LatestContent enabledQuery={enabledQuery} />;
      }
      break;

    case "sides":
      if (isErrorSides) {
        content = <Placeholder type="error" message={sidesError.message} />;
      }

      if (sides) {
        content = <LatestContent enabledQuery={enabledQuery} />;
      }
      break;
  }

  return (
    <section>
      <h2>Latest Additions</h2>
      <div className={classes.latest__grid}>
        <div className={classes.latest__container__btns}>
          <button
            onClick={() => setEnabledQuery("appetizers")}
            className={classes.latest__btn}
          >
            1
          </button>
          <button
            onClick={() => setEnabledQuery("main")}
            className={classes.latest__btn}
          >
            2
          </button>
          <button
            onClick={() => setEnabledQuery("sides")}
            className={classes.latest__btn}
          >
            3
          </button>
        </div>
        {content}
      </div>
    </section>
  );
}

export default Latest;
