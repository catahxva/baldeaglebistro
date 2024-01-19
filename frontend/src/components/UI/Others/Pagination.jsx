import classes from "./Pagination.module.css";

function Pagination({ maxPage, currentPage, paginationHandler }) {
  const currentPageNumber = Number(currentPage);
  const multiplePages = maxPage > 1;

  console.log("MAX PAGE:", maxPage);
  console.log("CURRENT PAGE", currentPage);

  let buttons;

  // case 1: currently on page one, only 2 pages
  if (currentPageNumber === 1 && multiplePages && maxPage === 2) {
    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.pagination__btn} ${classes.pagination__btn__active}`}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber + 1)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber + 1}
          </span>
        </button>
      </>
    );
  }

  // case 2: currently on page one, 3 or more pages
  if (currentPageNumber === 1 && multiplePages && maxPage >= 3) {
    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.pagination__btn} ${classes.pagination__btn__active}`}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber + 1)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber + 1}
          </span>
        </button>

        <button
          onClick={() => paginationHandler(currentPageNumber + 2)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber + 2}
          </span>
        </button>
      </>
    );
  }

  // case 3: multiple pages, we are on one of the pages in between
  // the first and last one
  if (currentPageNumber !== 1 && multiplePages && currentPageNumber < maxPage) {
    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber - 1)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.pagination__btn} ${classes.pagination__btn__active}`}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber + 1)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber + 1}
          </span>
        </button>
      </>
    );
  }

  // case 4: we got 2 pages, the current page is the last one
  if (currentPageNumber === maxPage && multiplePages && maxPage === 2) {
    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber - 1)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.pagination__btn} ${classes.pagination__btn__active}`}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
      </>
    );
  }

  // case 5: we got 3 or more pages, we are on the last page
  if (currentPageNumber === maxPage && multiplePages && maxPage >= 3) {
    buttons = (
      <>
        <button
          onClick={() => paginationHandler(currentPageNumber - 2)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber - 2}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber - 1)}
          className={classes.pagination__btn}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => paginationHandler(currentPageNumber)}
          className={`${classes.pagination__btn} ${classes.pagination__btn__active}`}
        >
          <span className={classes.pagination__btn__span}>
            {currentPageNumber}
          </span>
        </button>
      </>
    );
  }

  if (!multiplePages) {
    buttons = <></>;
  }

  return (
    <div className={classes.pagination}>
      <div className={classes.pagination__container}>{buttons}</div>
    </div>
  );
}

export default Pagination;
