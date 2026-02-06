import { type ChangeEvent, useEffect, useId, useMemo, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { debounce } from "../../utils/debounce";
import classes from "./styles.module.css";

const SearchBar = () => {
  const { search, setSearch } = useFilters();
  const inputId = useId();
  const [localSearch, setLocalSearch] = useState(search ?? "");

  // Create a debounced version of setSearch
  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [setSearch],
  );

  // Sync local state with external search state
  useEffect(() => {
    setLocalSearch(search ?? "");
  }, [search]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearch(query);
    debouncedSetSearch(query);
  };

  return (
    <form className={classes.container} data-testid="search-form">
      <label className={classes.label} htmlFor={inputId}>
        What are you looking for?
      </label>
      <div className={classes.searchBar}>
        <input
          id={inputId}
          className={classes.input}
          name="search"
          type="text"
          data-testid="search-input"
          placeholder="Search by name..."
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
