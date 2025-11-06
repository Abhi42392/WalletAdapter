import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Gift,
  FileSignature,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SideBar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const baseItem =
    "group flex items-center gap-3 px-3 py-2 rounded-xl transition-colors  ";
  const idleItem =
    "dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10";
  const activeItem = "bg-black text-white dark:bg-white dark:text-black";

  const linkClass = ({ isActive }) =>
    [baseItem, isActive ? activeItem : idleItem].join(" ");

  return (
    <aside
      className={[
        "relative h-screen select-none",
        // Apply ONLY dark styling
        "dark:bg-black dark:text-white",
        // Width transitions for collapse
        "transition-colors duration-300 ease-in-out",
        "w-56",
        "shadow-none",
        "border-r-2 border-gray-300",
      ].join(" ")}
    >
      <nav className="pt-2 flex flex-col gap-1 px-2">
        <NavLink to="/" className={linkClass} end>
          <Home size={18} className="shrink-0" />
          {!collapsed && <span className="text-sm">Home</span>}
        </NavLink>

        <NavLink to="/request-airdrop" className={linkClass}>
          <Gift size={18} className="shrink-0" />
          {!collapsed && <span className="text-sm">Request Airdrop</span>}
        </NavLink>

        <NavLink to="/sign-message" className={linkClass}>
          <FileSignature size={18} className="shrink-0" />
          {!collapsed && <span className="text-sm">Sign Message</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;
