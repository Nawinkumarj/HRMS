import SideBar from './SideBar';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../employee/Navbar';
import { assets } from '../../assets/assets';
import HrAdmin from './HrDashboard';
import Work  from './Work'
import LeaveList from './LeaveList';
import HrTeam from './HrTeam';
// import TeamMembers from './TeamMembers';

const menuItems = [
  { path: '/hr/', icon: assets.dashboardIcon, alt: 'Dashboard' },
  { path: '/hr/work', icon: assets.workflowIcon, alt: 'Work' },
  { path: '/hr/TeamMember/', icon: assets.teams, alt: 'Team Member' },
  { path: '/hr/leave', icon: assets.leave, alt: 'Leave' },
  { path: '/hr/holiday', icon: assets.leaveIcon, alt: 'Holidays' },
  { path: '/hr/attendance', icon: assets.attendanceIcon, alt: 'Attendance' },
  { path: '/hr/help', icon: assets.helpdeskIcon, alt: 'Help Desk' },
];

const Admin = () => {
  return (
    <div className="EmpDashboard">
      <div className='EmpTopSection flex-center'>
        <img src={assets.cropLogo} alt="Company Logo" width={90} />
        <Navbar />
      </div>
      <SideBar menuItems={menuItems} />     
      <div className="dashboardContent">
      <Routes>
            <Route index element={<HrAdmin />} />
            <Route path="AdminDashboard" element={<HrAdmin />} />
            <Route path="work" element={ <Work /> } />
            <Route path="leave" element={ <LeaveList /> } />
            <Route path='TeamMember' element={<HrTeam/>}/>
            
            {/* <Route path="TeamMember" element={<TeamMembers />} /> */}
      </Routes>
      </div>
    </div>
  );
};

export default Admin;
