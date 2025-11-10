import React from 'react'
import ProfileCard from '../../components/ProfileCard'
import EmployeeAttendance from '../../components/EmployeeAttendance'
import CustomDonutChart from "../../components/PieChart";
import {users} from "../../data/User";
import WeatherCard from '../../components/WeatherCard';
import EmployeeAttendanceBarChart from '../../components/AttendanceChart';
import DailyReport from '../../components/DailyReport';
import CalendarApp from "../../components/MiniCalendar"


const SuperDashboard = () => {
  return (
    <div>
      <div className="superDashboard-main1">
        <div>
          <ProfileCard />
        </div>
        <div>
          <CustomDonutChart users={users} heading={"Total Employees"} />
        </div>
        <div className="superDashboard-section">
          <EmployeeAttendance value={"10"} heading={"total emp"} />
          <EmployeeAttendanceBarChart />
        </div>
        {/* <WeatherCard /> */}
      </div>
      <div className="superDashboard-main2">
        <div>
          <CalendarApp />
        </div>
        <div>
          <WeatherCard />
        </div>
        <div>
          <DailyReport />
        </div>
      </div>
    </div>
  );
}

export default SuperDashboard