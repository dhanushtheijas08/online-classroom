"use client";
import NavItem from "@/components/nav-item";
import { navBar } from "@/constants/constants";

const NavBar = () => {
  const renderNavItems = navBar.map((item) => (
    <NavItem
      key={item.href}
      label={item.label}
      href={item.href}
      icon={item.icon}
    />
  ));
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-2.5">
      {renderNavItems}
    </nav>
  );
};

export default NavBar;
