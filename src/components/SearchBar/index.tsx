import { useEffect, useId, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import Button from "../Button";
import classes from "./styles.module.css";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { search, setSearch } = useFilters();
  const inputId = useId();

  const handleSubmit = (formData: FormData) => {
    const query = formData.get("search");
    setSearch(String(query));
  };

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <form className={classes.container} action={handleSubmit} data-testid="search-form">
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
          value={searchValue ?? ""}
          onChange={(e) => setSearchValue(e.target.value || null)}
        />
        <Button className={classes.button} label="Search" type="submit" />
      </div>
    </form>
  );
};

export default SearchBar;
