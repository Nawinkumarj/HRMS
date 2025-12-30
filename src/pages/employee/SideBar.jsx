import { NavLink } from "react-router-dom";

const SideBar = ({ menuItems }) => {
  const mode = localStorage.getItem("mode") || "light";

    return (
      <div className={`sideContainer ${mode} flex-center`}>
        {Array.isArray(menuItems) &&
          menuItems.map((item, index) => (
            <NavLink key={index} to={item.path}>
              <div className="SideBarIcon">
                <img src={item.icon} alt={item.alt || 'Sidebar Icon'} />
              </div>
            </NavLink>
          ))}
      </div>
    );
  };
  
  export default SideBar;
  