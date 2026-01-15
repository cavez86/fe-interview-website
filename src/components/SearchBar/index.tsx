import { useId } from 'react';
import Button from '../Button';
import classes from './styles.module.css';

const SearchBar = () => {
  const formId = useId();
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={formId}>
        what are you looking for?
      </label>
      <div className={classes.searchBar}>
        <input id={formId} className={classes.input} type='text' placeholder='Search by name...' />
        <Button className={classes.button} label='Search' />
      </div>
    </div>
  );
};

export default SearchBar;
