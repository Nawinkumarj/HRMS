import SideBar from "./SideBar";
import { Routes, Route } from "react-router-dom";
import Navbar from "../employee/Navbar";
import { assets } from "../../assets/assets";
import HrAdmin from "./HrDashboard";
import Work from "./Work";
import LeaveList from "./LeaveList";
import HrTeam from "./HrTeam";
import HrTeamDetail from "./HrTeamDetail";
import { EmployeesProvider } from "../../context/EmployeesContext";
// import TeamMembers from './TeamMembers';

const menuItems = [
  { path: "/hr/", icon: assets.dashboardIcon, alt: "Dashboard" },
  { path: "/hr/work", icon: assets.workflowIcon, alt: "Work" },
  {
    // path: '/hr/TeamMember/',
    icon: assets.teams,
    alt: "Team Member",
    children: [
      { path: "/hr/TeamMember/employee-detail", label: "Employee Detail" },
      { path: "/hr/TeamMember/payslip", label: "Payslip" },
      { path: "/hr/TeamMember/xx", label: "XX" },
    ],
  },
  { path: "/hr/leave", icon: assets.leave, alt: "Leave" },
  { path: "/hr/holiday", icon: assets.leaveIcon, alt: "Holidays" },
  { path: "/hr/attendance", icon: assets.attendanceIcon, alt: "Attendance" },
  { path: "/hr/help", icon: assets.helpdeskIcon, alt: "Help Desk" },
];

const Admin = () => {
  return (
    <div className="EmpDashboard">
      <div className="EmpTopSection flex-center">
        <img src={assets.cropLogo} alt="Company Logo" width={90} />
        <Navbar />
      </div>
      <SideBar menuItems={menuItems} />
      <div className="dashboardContent">
        <EmployeesProvider>
          <Routes>
            <Route index element={<HrAdmin />} />
            <Route path="AdminDashboard" element={<HrAdmin />} />
            <Route path="work" element={<Work />} />
            <Route path="leave" element={<LeaveList />} />

            <Route path="TeamMember">
              <Route index element={<HrTeam />} />
              <Route path="employee-detail" element={<HrTeam />} />
              <Route path="employee-detail/view/:id" element={<HrTeamDetail />} />
              <Route path="employee-detail/new" element={<HrTeamDetail />} />
              <Route path="payslip" element={<div>Payslip</div>} />
              <Route path="xx" element={<div>XX</div>} />
            </Route>
          </Routes>
        </EmployeesProvider>
      </div>
    </div>
  );
};

export default Admin;
