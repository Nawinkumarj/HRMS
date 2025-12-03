import React, { createContext, useState, useContext, useEffect } from "react";

const AttendanceContext = createContext();

const getTodayKey = (date = new Date()) => date.toISOString().split("T")[0];

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState({
    isCheckedIn: false,
    checkInTime: null,
    checkOutTime: null,
    runningHours: "0:00:00",
    runningSeconds: 0,
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  // Restore "today" check-in state if user checked in earlier and page reloaded
  useEffect(() => {
    const todayKey = getTodayKey();
    const todayRecord = attendanceRecords[todayKey];
    if (todayRecord && todayRecord.checkIn && !todayRecord.checkOut) {
      const checkInTime = new Date(todayRecord.checkIn);
      const now = new Date();
      const diffSecs = Math.floor((now - checkInTime) / 1000);
      const diffHrs = Math.floor(diffSecs / 3600);
      const diffMins = Math.floor((diffSecs % 3600) / 60);
      const diffRemainingSecs = diffSecs % 60;
      setAttendance({
        isCheckedIn: true,
        checkInTime,
        checkOutTime: null,
        runningSeconds: diffSecs,
        runningHours: `${diffHrs}:${String(diffMins).padStart(2, "0")}:${String(
          diffRemainingSecs
        ).padStart(2, "0")}`,
      });
    }
  }, []); // run once on mount

  // running timer while checked in
  useEffect(() => {
    let timer;
    if (attendance.isCheckedIn && attendance.checkInTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diffMs = now - new Date(attendance.checkInTime);
        const runningSeconds = Math.floor(diffMs / 1000);
        const diffHrs = Math.floor(runningSeconds / 3600);
        const diffMins = Math.floor((runningSeconds % 3600) / 60);
        const diffSecs = runningSeconds % 60;
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
    const todayKey = getTodayKey(now);

    setAttendance({
      isCheckedIn: true,
      checkInTime: now,
      checkOutTime: null,
      runningHours: "0:00:00",
      runningSeconds: 0,
    });

    setAttendanceRecords((prev) => ({
      ...prev,
      [todayKey]: {
        ...(prev[todayKey] || {}),
        status: "present",
        checkIn: now.toISOString(),
      },
    }));
  };

  const handleCheckOut = () => {
    const now = new Date();
    const todayKey = getTodayKey(now);

    if (!attendance.checkInTime && !attendanceRecords[todayKey]?.checkIn) {
      // nothing to check out from
      return;
    }

    // compute total for the day from checkIn -> now
    const checkInTime = attendance.checkInTime
      ? new Date(attendance.checkInTime)
      : new Date(attendanceRecords[todayKey].checkIn);
    const diffMs = now - checkInTime;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffHrs = Math.floor(diffSecs / 3600);
    const diffMins = Math.floor((diffSecs % 3600) / 60);
    const diffRemainSecs = diffSecs % 60;
    const totalHours = `${diffHrs}:${String(diffMins).padStart(2, "0")}:${String(
      diffRemainSecs
    ).padStart(2, "0")}`;

    setAttendance({
      isCheckedIn: false,
      checkInTime: null,
      checkOutTime: now,
      runningHours: totalHours,
      runningSeconds: diffSecs,
    });

    setAttendanceRecords((prev) => ({
      ...prev,
      [todayKey]: {
        ...(prev[todayKey] || {}),
        status: "present",
        checkOut: now.toISOString(),
        totalHours,
      },
    }));
  };

  // Utility to mark past days without a record as "leave"
  // This can be called on app start to fill gaps or left to UI to treat absence as leave visually.
  const markMissingAsLeave = (fromDate, toDate) => {
    // fromDate/toDate are Date objects
    const result = { ...attendanceRecords };
    const cursor = new Date(fromDate);
    while (cursor <= toDate) {
      const key = getTodayKey(cursor);
      if (!result[key]) {
        result[key] = { status: "leave" };
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    setAttendanceRecords(result);
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        attendanceRecords,
        handleCheckIn,
        handleCheckOut,
        markMissingAsLeave,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
export default AttendanceProvider;
