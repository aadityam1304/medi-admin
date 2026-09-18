import classes from "./NavItem.module.css";

export default function NavItem({ id, icon, label, onSelect, isActive }) {
  return (
    <li
      className={`${classes.navItem} ${isActive ? classes.active : ""}`}
      onClick={() => onSelect(id)}
    >
      {icon}
      <span className={classes.label}>{label}</span>

      <span className={classes.tooltip}>{label}</span>
    </li>
  );
}
