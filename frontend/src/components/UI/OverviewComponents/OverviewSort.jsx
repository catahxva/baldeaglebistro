import classes from "./OverviewSort.module.css";

function OverviewSort({ onChange, activeSort }) {
  const defaultSort = activeSort ?? "default";
  return (
    <form className={classes.overview__sort__form}>
      <label className={classes.overview__sort__form__label}>Sort:</label>
      <select
        defaultValue={defaultSort}
        onChange={onChange}
        className={classes.overview__sort__form__select}
      >
        <option value="default">Default</option>
        <option value="priceAscending">Price (ascending)</option>
        <option value="priceDescending">Price (descending)</option>
        <option value="latest">Latest</option>
        <option value="popular">Popular</option>
      </select>
    </form>
  );
}

export default OverviewSort;
