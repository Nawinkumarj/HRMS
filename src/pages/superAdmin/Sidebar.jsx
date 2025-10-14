import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';


const Sidebar = () => {
    return (
        <div className="sidebar-container">
            {/* Main Content */}
            <div className="main-content">
                <div className="nav-links">
                    <NavLink to="/contracts" className="main-nav">
                        <img src={assets.home} className="nav-icon" />
                    </NavLink>
                    <NavLink to="/analysts" className="main-nav">
                        <img src={assets.grid} className="nav-icon" /> 
                    </NavLink>
                    <NavLink to="/setting" className="main-nav">
                        <img src={assets.profile} className="nav-icon" />
                    </NavLink>
                    <NavLink to="/analysts" className="main-nav">
                        <img src={assets.grid} className="nav-icon" /> 
                    </NavLink>
                    <NavLink to="/setting" className="main-nav">
                        <img src={assets.profile} className="nav-icon" />
                    </NavLink>
                </div>
            </div>


            {/* Profile Content */}
            <div className="profile-content">
                <div className="avatar-container">
                    <img src={assets.profileImg} className="admin-profile" />
                    <span className="status-indicator"></span>
                </div>
                <div>
                    <p className="profile-name">Dianne Russell</p>
                    <p className="profile-email">russel@hey.com</p>
                </div>
                <div>
                    <img src alt="" className="profile-icon" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
