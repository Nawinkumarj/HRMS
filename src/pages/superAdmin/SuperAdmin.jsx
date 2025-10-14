import SideBar from "../employee/SideBar";
import { Routes, Route } from "react-router-dom";
import Navbar from "../employee/Navbar";
import { assets } from "../../assets/assets";
import SuperDashboard from "./SuperDashboard";

const menuItems = [
  {
    path: "/superadmin/superDashboard",
    icon: assets.dashboardIcon,
    alt: "Dashboard",
  },
  { path: "/superadmin/work", icon: assets.workflowIcon, alt: "Work" },
  { path: "/superadmin/salary", icon: assets.salaryIcon, alt: "Salary" },
  { path: "/superadmin/holiday", icon: assets.leaveIcon, alt: "Holidays" },
  {
    path: "/superadmin/attendance",
    icon: assets.attendanceIcon,
    alt: "Attendance",
  },
  { path: "/superadmin/inbox", icon: assets.inboxIcon, alt: "Inbox" },
  { path: "/superadmin/help", icon: assets.helpdeskIcon, alt: "Help Desk" },
];

const SuperAdmin = () => {
  return (
    <div className="EmpDashboard">
      <div className="EmpTopSection flex-center">
        <img src={assets.cropLogo} alt="Company Logo" width={100} />
        <Navbar />
      </div>
      <SideBar menuItems={menuItems} />
      <div className="dashboardContent">
        <Routes>
          <Route index element={<SuperDashboard />} />
          <Route path="/superDashboard" element={<SuperDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
