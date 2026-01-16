import { useId } from 'react';
import { useFilters } from '../../hooks/useFilters';
import Button from '../Button';
import classes from './styles.module.css';

const SearchBar = () => {
  const { search, setSearch } = useFilters();
  const inputId = useId();

  const handleSubmit = (formData: FormData) => {
    const query = formData.get('search');
    setSearch(query ? String(query) : null);
  };

  return (
    <form className={classes.container} action={handleSubmit} data-testid='search-form'>
      <label className={classes.label} htmlFor={inputId}>
        what are you looking for?
      </label>
      <div className={classes.searchBar}>
        <input
          id={inputId}
          className={classes.input}
          name='search'
          type='text'
          data-testid='search-input'
          placeholder='Search by name...'
          defaultValue={search ?? ''}
        />
        <Button className={classes.button} label='Search' type='submit' />
      </div>
    </form>
  );
};

export default SearchBar;
