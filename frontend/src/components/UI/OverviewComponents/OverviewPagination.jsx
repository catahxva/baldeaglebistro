import classes from "./OverviewPagination.module.css";

function OverviewPagination({ maxPage, currentPage }) {
  console.log(maxPage, currentPage);

  return (
    <div className={classes.overview__pagination}>
      <div className={classes.overview__pagination__container}>
        <button className={classes.overview__pagination__btn}>
          <span className={classes.overview__pagination__btn__span}>1</span>
        </button>
        <button
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__btn__span}>2</span>
        </button>
        <button className={classes.overview__pagination__btn}>
          <span className={classes.overview__pagination__btn__span}>3</span>
        </button>
      </div>
    </div>
  );
}

export default OverviewPagination;
