import SideBar from '../employee/SideBar';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../employee/Navbar';
import { assets } from '../../assets/assets';
import MainAdmin from './MainAdmin';
import TeamMembers from './TeamMembers';

const menuItems = [
  { path: '/admin/', icon: assets.dashboardIcon, alt: 'Dashboard' },
  { path: '/admin/work', icon: assets.workflowIcon, alt: 'Work' },
  { path: '/admin/TeamMember/', icon: assets.teams, alt: 'Team Member' },
  { path: '/admin/holiday', icon: assets.leaveIcon, alt: 'Holidays' },
  { path: '/employee/attendance', icon: assets.attendanceIcon, alt: 'Attendance' },
  { path: '/employee/help', icon: assets.helpdeskIcon, alt: 'Help Desk' },
];

const Admin = () => {
  return (
    <div className="EmpDashboard">
      <div className='EmpTopSection flex-center'>
        <img src={assets.cropLogo} alt="Company Logo" width={90} />
        <Navbar />
      </div>
      <SideBar  menuItems={menuItems}  />     
      <div className="dashboardContent">
      <Routes>
            <Route index element={<MainAdmin />} />
            <Route path="AdminDashboard" element={<MainAdmin />} />
            <Route path="TeamMember" element={<TeamMembers />} />
      </Routes>
      </div>
    </div>
  );
};

export default Admin;
