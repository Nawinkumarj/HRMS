import React, { useEffect, useState } from "react";
import { useAttendance } from "../context/AttendanceContext";
import { assets } from "../assets/assets";

const CheckInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date().toLocaleDateString();

  const { attendance, handleCheckIn, handleCheckOut } = useAttendance();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="checkInOutContainer flex-center">
      <div className="topSection">
        <span>Attendance</span>
        <p className="timeDate">
          {currentTime.toLocaleTimeString()}, {currentDate}
        </p>
      </div>
      <div
        className="WorkingTimeContainer"
        style={{
          background: `conic-gradient(
      rgb(102, 255, 102) ${Math.min(
        (attendance.runningSeconds / 32400) * 100,
        100
      )}%, 
      transparent ${Math.min((attendance.runningSeconds / 32400) * 100, 100)}%)
    `,
        }}
      >
        <div className="innerRadius flex-center">
          <p>Total Hours</p>
          <h1>{attendance.runningHours}</h1>
        </div>
      </div>
      <div className="PunchShowContainer">
        {attendance.checkInTime && (
          <p className="flex-center">
            <img src={assets.fingerPrint_Icon} alt="Check-in Icon" />
            Checked In at{" "}
            {new Date(attendance.checkInTime).toLocaleTimeString()}
          </p>
        )}
        {attendance.checkOutTime && (
          <p className="flex-center">
            <img src={assets.fingerPrint_Icon} alt="Check-out Icon" />
            Checked Out at{" "}
            {new Date(attendance.checkOutTime).toLocaleTimeString()}
          </p>
        )}
      </div>
      <div className="PunchBtn">
        {attendance.isCheckedIn ? (
          <button onClick={handleCheckOut}>Check Out</button>
        ) : (
          <button onClick={handleCheckIn}>Check In</button>
        )}
      </div>
    </div>
  );
};

export default CheckInOut;
