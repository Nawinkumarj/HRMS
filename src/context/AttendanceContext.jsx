import React, { createContext, useState, useContext, useEffect } from "react";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState({
    isCheckedIn: false,
    checkInTime: null,
    checkOutTime: null,
    runningHours: "0:00:00",
    runningSeconds: 0,
  });

  useEffect(() => {
    let timer;

    if (attendance.isCheckedIn && attendance.checkInTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diffMs = now - new Date(attendance.checkInTime);
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        const runningSeconds = Math.floor(diffMs / 1000);
        const runningHours = `${diffHrs}:${String(diffMins).padStart(
          2,
          "0"
        )}:${String(diffSecs).padStart(2, "0")}`;

        setAttendance((prev) => ({
          ...prev,
          runningHours,
          runningSeconds,
        }));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [attendance.isCheckedIn, attendance.checkInTime]);

  const handleCheckIn = () => {
    const now = new Date();
    setAttendance({
      isCheckedIn: true,
      checkInTime: now,
      checkOutTime: null,
      runningHours: "0:00:00",
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    if (attendance.checkInTime) {
      const diffMs = now - new Date(attendance.checkInTime);
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.floor((diffMs % 3600000) / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);
      const totalHours = `${diffHrs}:${String(diffMins).padStart(
        2,
        "0"
      )}:${String(diffSecs).padStart(2, "0")}`;

      setAttendance({
        isCheckedIn: false,
        checkInTime: null,
        checkOutTime: now,
        runningHours: totalHours,
      });
    }
  };

  return (
    <AttendanceContext.Provider
      value={{ attendance, handleCheckIn, handleCheckOut }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
