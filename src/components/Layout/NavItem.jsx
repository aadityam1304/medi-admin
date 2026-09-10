import classes from "./NavItem.module.css";

function NavItem({ icon, label }) {
  return (
    <li className={classes.navItem}>
      {icon}
      <span>{label}</span>
    </li>
  );
}

export default NavItem;
