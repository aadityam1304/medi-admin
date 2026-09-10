import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.title}>
        <h1>Good morning, Admin 👋</h1>
        <p>Here's what's happening with your pharmacy today.</p>
      </div>
    </header>
  );
}

export default Header;
