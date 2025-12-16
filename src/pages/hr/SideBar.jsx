import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ menuItems }) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const handleSubmenuClick = () => {
    // Close submenu when a child route is clicked
    setOpenItem(null);
  };

  return (
    <div className="sideContainer flex-center">
      {Array.isArray(menuItems) &&
        menuItems.map((item, index) => (
          <div key={index} className="SideBarGroup">
            <div
              className="SideBarIcon"
              onClick={() =>
                item.children ? toggleSubmenu(index) : setOpenItem(null)
              }
            >
              {item.path ? (
                <NavLink to={item.path}>
                  <img src={item.icon} alt={item.alt || "Sidebar Icon"} />
                </NavLink>
              ) : (
                <img src={item.icon} alt={item.alt || "Sidebar Icon"} />
              )}
            </div>

            {/* Submenu */}
            {item.children && openItem === index && (
              <div className="SubMenu">
                {item.children.map((child, cIndex) => (
                  <NavLink
                    key={cIndex}
                    to={child.path}
                    className="SubMenuItem"
                    onClick={handleSubmenuClick} // ✅ close submenu on click
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default SideBar;
 