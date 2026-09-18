import classes from "./Header.module.css";

export default function Header() {
  const hour = new Date().getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  return (
    <header className={classes.header}>
      <div className={classes.title}>
        <h1>{greeting}, Admin 👋</h1>
        <p>Here's what's happening with your pharmacy today.</p>
      </div>
    </header>
  );
}
