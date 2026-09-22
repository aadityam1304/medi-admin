import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiZap,
  FiSettings,
} from "react-icons/fi";
import classes from "./Sidebar.module.css";
import NavItem from "./NavItem";

const navItems = [
  {
    id: 1,
    icon: <FiHome />,
    label: "Dashboard",
  },
  {
    id: 2,
    icon: <FiPackage />,
    label: "Inventory",
  },
  {
    id: 3,
    icon: <FiShoppingCart />,
    label: "Orders",
  },
  {
    id: 4,
    icon: <FiZap />,
    label: "AI Insights",
  },
  {
    id: 5,
    icon: <FiSettings />,
    label: "Settings",
  },
];

export default function Sidebar({
  activeItemId,
  setActiveItemId,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  function handleSelect(id) {
    setActiveItemId(id);
    setIsSidebarOpen(false);
  }
  return (
    <aside
      className={`${classes.sidebar} ${isSidebarOpen ? classes.open : ""}`}
    >
      <div className={classes.logo}>
        <div className={classes.logoIcon}>💊</div>

        <h2>MediAdmin</h2>
      </div>

      <nav className={classes.nav}>
        <ul>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              id={item.id}
              onSelect={handleSelect}
              isActive={item.id === activeItemId}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
