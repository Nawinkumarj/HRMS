import { NavLink } from "react-router-dom";

const SideBar = ({ menuItems }) => {
    return (
      <div className="sideContainer flex-center">
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
  