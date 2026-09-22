import { FiMenu } from "react-icons/fi";
import classes from "./Header.module.css";

export default function Header({ setIsSidebarOpen }) {
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
      <button
        className={classes.menuButton}
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      >
        <FiMenu />
      </button>
      <div className={classes.title}>
        <h1>{greeting}, Admin 👋</h1>
        <p>Here's what's happening with your pharmacy today.</p>
      </div>
    </header>
  );
}
