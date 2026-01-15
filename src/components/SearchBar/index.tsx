import { useId } from 'react';
import Button from '../Button';
import classes from './styles.module.css';

const SearchBar = () => {
  const inputId = useId();

  const handleSubmit = (formData: FormData) => {
    const query = formData.get('search');
    console.log(`Search query: ${query}`);
  };

  return (
    <form className={classes.container} action={handleSubmit}>
      <label className={classes.label} htmlFor={inputId}>
        what are you looking for?
      </label>
      <div className={classes.searchBar}>
        <input id={inputId} className={classes.input} name='search' type='text' placeholder='Search by name...' />
        <Button className={classes.button} label='Search' type='submit' />
      </div>
    </form>
  );
};

export default SearchBar;
