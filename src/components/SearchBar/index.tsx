import Button from '../Button';
import classes from './styles.module.css';

const SearchBar = () => {
  return (
    <div className={classes.container}>
      <span className={classes.label}>what are you looking for?</span>
      <div className={classes.searchBar}>
        <input className={classes.input} type='text' placeholder='Search by name...' />
        <Button className={classes.button} label='Search' />
      </div>
    </div>
  );
};

export default SearchBar;
