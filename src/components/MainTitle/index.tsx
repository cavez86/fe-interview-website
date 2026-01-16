import classes from "./styles.module.css";

const MainTitle = () => {
  return (
    <h1 className={classes.title}>
      <span className={classes.firstWord}>User</span> Dashboard
    </h1>
  );
};

export default MainTitle;
