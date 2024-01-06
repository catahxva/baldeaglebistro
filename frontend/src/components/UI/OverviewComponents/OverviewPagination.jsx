import classes from "./OverviewPagination.module.css";

function OverviewPagination({ maxPage, currentPage, paginationHandler }) {
  console.log(maxPage, currentPage);
  const currentPageNumber = Number(currentPage);
  const multiplePages = maxPage > 1;

  let buttons;

  // case 1: currently on page one, only 2 pages
  if (currentPageNumber === 1 && multiplePages && maxPage === 2) {
    console.log("CASE 1 APPLIED");
    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber + 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber + 1}
          </span>
        </button>
      </>
    );
  }

  // case 2: currently on page one, 3 or more pages
  if (currentPageNumber === 1 && multiplePages && maxPage >= 3) {
    console.log("CASE 2 APPLIED");

    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber + 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber + 1}
          </span>
        </button>

        <button
          onClick={() => paginationHandler(currentPageNumber + 2)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber + 2}
          </span>
        </button>
      </>
    );
  }

  // case 3: multiple pages, we are on one of the pages in between
  // the first and last one
  if (currentPageNumber !== 1 && multiplePages && currentPageNumber < maxPage) {
    console.log("CASE 3 APPLIED");
    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber - 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber + 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber + 1}
          </span>
        </button>
      </>
    );
  }

  // case 4: we got 2 pages, the current page is the last one
  if (currentPageNumber === maxPage && multiplePages && maxPage === 2) {
    console.log("CASE 4 APPLIED");

    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber - 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
      </>
    );
  }

  // case 5: we got 3 or more pages, we are on the last page
  if (currentPageNumber === maxPage && multiplePages && maxPage >= 3) {
    console.log("CASE 5 APPLIED");

    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber - 2)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber - 2}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber - 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
      </>
    );
  }

  if (!multiplePages) {
    console.log("CASE 6 APPLIED");

    buttons = <></>;
  }

  return (
    <div className={classes.overview__pagination}>
      <div className={classes.overview__pagination__container}>{buttons}</div>
    </div>
  );
}

export default OverviewPagination;
