import SideBar from './SideBar';
import Work from './Work';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { assets } from '../../assets/assets';
import MainDashboard from './MainDashboard';
import Profile from './Profile';
import Holiday from './Holiday';
import Attandance from './Attandence'
import Salary from './Salary'
import HolidayList from '../../components/HolidayList';

const menuItems = [
  { path: '/employee/dashboard', icon: assets.dashboardIcon, alt: 'Dashboard' },
  { path: '/employee/work', icon: assets.workflowIcon, alt: 'Work' },
  { path: '/employee/salary', icon: assets.salaryIcon, alt: 'Salary' },
  { path: '/employee/holiday', icon: assets.leaveIcon, alt: 'Holidays' },
  { path: '/employee/attendance', icon: assets.attendanceIcon, alt: 'Attendance' },
  { path: '/employee/inbox', icon: assets.inboxIcon, alt: 'Inbox' },
  { path: '/employee/help', icon: assets.helpdeskIcon, alt: 'Help Desk' },
];

const EmployeeDashboard = () => {
  return (
    <div className="EmpDashboard">
      
      <div className='EmpTopSection flex-center'>
        <img src={assets.cropLogo} alt="Company Logo" width={100} />
        <Navbar />
      </div>
      <SideBar  menuItems={menuItems}  />     
      <div className="dashboardContent">
      <Routes>
            <Route index element={<MainDashboard />} />
            <Route path="dashboard" element={<MainDashboard />} />
            <Route path="work" element={<Work />} />
            <Route path="salary" element={<Salary />} />
            <Route path="attendance" element={<Attandance />}/>
            <Route path="holiday" element={<Holiday />} />
            {/* <Route path="holidaylist" element={<HolidayList />} /> */}
            <Route path="profile" element={<Profile />} />
      </Routes>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
