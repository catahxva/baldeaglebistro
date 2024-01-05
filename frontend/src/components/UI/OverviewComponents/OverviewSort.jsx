import classes from "./OverviewSort.module.css";

function OverviewSort({ onChange, existingSort }) {
  return (
    <form className={classes.overview__sort}>
      <label htmlFor="sort" className={classes.overview__sort__label}>
        Sort results:
      </label>
      <select
        name="sort"
        defaultValue={existingSort}
        onChange={onChange}
        className={classes.overview__sort__select}
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
